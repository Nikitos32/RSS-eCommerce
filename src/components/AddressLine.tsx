import {
  CiBookmarkCheck,
  CiDeliveryTruck,
  CiEdit,
  CiMoneyCheck1,
  CiTrash,
} from 'react-icons/ci';
import { AddressForProfile } from '../utils';

type AddressLineProps = { address: AddressForProfile };
function AddressLine({ address }: AddressLineProps) {
  return (
    <>
      <div className="flex flex-row justify-end gap-1 text-2xl">
        {address.isDefault && <CiBookmarkCheck title="Default" />}
        {address.isDefault && address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {address.isDefault && address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" />
        )}
        {!address.isDefault && address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {!address.isDefault && address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" />
        )}
      </div>
      <p>{address.strAddress}</p>
      <div className="flex flex-row gap-4 text-2xl">
        <a href="" title="Edit" className=" hover:text-moonNeutral-600">
          <CiEdit />
        </a>
        {!address.isDefault && (
          <a href="" title="Delete" className=" hover:text-moonNeutral-600">
            <CiTrash />
          </a>
        )}
      </div>
    </>
  );
}
export default AddressLine;
