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
  onDelete: (key: string) => void;
};
function AddressLine(props: AddressLineProps) {
  const handleClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.onEdit(props.address.id);
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.onDelete(props.address.id);
  };
  return (
    <>
      <div className="flex flex-row justify-end gap-1 text-2xl">
        {props.address.isDefault && (
          <CiBookmarkCheck title="Default" className="text-moonBrown" />
        )}
        {props.address.isDefault && props.address.isShipping && (
          <CiDeliveryTruck
            title="Shipping Address"
            className="text-moonBrown"
          />
        )}
        {props.address.isDefault && props.address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" className="text-moonBrown" />
        )}
        {!props.address.isDefault && props.address.isShipping && (
          <CiDeliveryTruck title="Shipping Address" />
        )}
        {!props.address.isDefault && props.address.isBilling && (
          <CiMoneyCheck1 title="Billing Address" />
        )}
      </div>
      <p
        className={
          props.address.isDefault ? `text-moonBrown` : `even:bg-moonNeutral-200`
        }
      >
        {props.address.strAddress}
      </p>
      <div className="flex flex-row gap-4 text-2xl">
        {!props.address.isDefault && props.showEdit && (
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
          <a
            href=""
            onClick={handleClickDelete}
            title="Delete"
            className=" hover:text-moonNeutral-600"
          >
            <CiTrash />
          </a>
        )}
      </div>
    </>
  );
}
export default AddressLine;
