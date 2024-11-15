import { TOrder } from '@utils-types';
import { ConstructorState } from '../../../services/slices/constructorSlice';

export type BurgerConstructorUIProps = {
  constructorItems: ConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
