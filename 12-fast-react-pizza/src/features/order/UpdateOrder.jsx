import { Button } from '../../ui/Button.jsx';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant.js';

const UpdateOrder = ({ order }) => {
	const fetcher = useFetcher();

	return (
		<fetcher.Form method="PATCH" className="text-right">
			<Button type="primary">Make priority</Button>
		</fetcher.Form>
	);
};

export const action = async ({ request, params }) => {
	const data = { priority: true };
	await updateOrder(params.orderId, data);
	return null;
};

export { UpdateOrder };
