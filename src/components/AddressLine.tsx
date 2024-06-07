import {
  CiBookmarkCheck,
  CiDeliveryTruck,
  CiEdit,
  CiMoneyCheck1,
  CiTrash,
} from 'react-icons/ci';
import { AddressForProfile } from '../utils';

type AddressLineProps = {
  address: AddressForProfile;
  showEdit: boolean;
  onEdit: (key: string) => void;
};
function AddressLine(props: AddressLineProps) {
  const handleClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.onEdit(props.address.id);
  };
  return (
    <>
      <div className="flex flex-row justify-end gap-1 text-2xl">
        {props.address.isDefault && <CiBookmarkCheck title="Default" />}
        {props.address.isDefault && props.address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {props.address.isDefault && props.address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" />
        )}
        {!props.address.isDefault && props.address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {!props.address.isDefault && props.address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" />
        )}
      </div>
      <p className="odd:bg-moonNeutral-200">{props.address.strAddress}</p>
      <div className="flex flex-row gap-4 text-2xl">
        {props.showEdit && (
          <a
            href=""
            onClick={handleClickEdit}
            title="Edit"
            className=" hover:text-moonNeutral-600"
          >
            <CiEdit />
          </a>
        )}
        {props.address.isDeletable && props.showEdit && (
          <a href="" title="Delete" className=" hover:text-moonNeutral-600">
            <CiTrash />
          </a>
        )}
      </div>
    </>
  );
}
export default AddressLine;
