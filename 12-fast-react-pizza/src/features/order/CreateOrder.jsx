import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant.js';
import { Button } from '../../ui/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store.js';
import { formatCurrency } from '../../utils/helpers.js';
import { useState } from 'react';
import { fetchAdress } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str,
	);

const CreateOrder = () => {
	const [withPriority, setWithPriority] = useState(false);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';
	const formErrors = useActionData();
	const dispatch = useDispatch();
	const {
		username,
		status: addressStatus,
		position,
		address,
	} = useSelector(store => store.user);
	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);

	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;
	const isLoadingAddress = addressStatus === 'loading';

	if (!cart.length) return <EmptyCart />;

	return (
		<div className="px-4 py-6">
			<h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

			<Form method="POST">
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">First Name</label>
					<input
						type="text"
						defaultValue={username}
						name="customer"
						required
						className="input grow"
					/>
				</div>
				<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">Phone number</label>
					<div className="grow">
						<input type="tel" name="phone" required className="input w-full" />
						{formErrors?.phone && (
							<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>
				<div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
					<label className="sm:basis-40">Address</label>
					<div className="grow">
						<input
							type="text"
							name="address"
							disabled={isLoadingAddress}
							defaultValue={address}
							required
							className="input w-full"
						/>
						{addressStatus === 'error' && (
							<p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
								There was a problem getting your address.
							</p>
						)}
					</div>

					{!position.latitude && !position.longitude && (
						<span className="absolute right-[4px] top-[3px] z-50 sm:right-[5px] sm:top-[5px]">
							<Button
								type="small"
								disabled={isLoadingAddress}
								onClick={event => {
									event.preventDefault();
									dispatch(fetchAdress());
								}}
							>
								Get Position
							</Button>
						</span>
					)}
				</div>
				<div className="mb-12 flex items-center gap-5">
					<input
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={e => setWithPriority(e.target.checked)}
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
					/>
					<label htmlFor="priority" className="font-medium">
						Want to give your order priority?
					</label>
				</div>
				<div>
					<input type="hidden" name="cart" value={JSON.stringify(cart)} />
					<input
						type="hidden"
						name="position"
						value={
							position.longitude && position.latitude
								? `${position.latitude},${position.longitude}`
								: ''
						}
					/>

					<Button type="primary" disabled={isSubmitting || isLoadingAddress}>
						{isSubmitting
							? 'Placing order...'
							: `Order now for ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
};

const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === 'true',
	};

	const errors = {};
	if (!isValidPhone(order.phone))
		errors.phone =
			'Please give us your correct phone number. We might need it to contact you.';

	if (Object.keys(errors).length > 0) return errors;

	const newOrder = await createOrder(order);

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
};

export { action };

export default CreateOrder;
