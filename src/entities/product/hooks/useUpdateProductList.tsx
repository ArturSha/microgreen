import { useUpdateProductListMutation } from '../api/productApi';
import type { Product, ProductUpdateForm } from '../model/types/product';

type UpdateMode = 'increase' | 'decrease';
interface UpdateProductsProps {
  mode: UpdateMode;
  orderProducts: Product[];
  actualProductList: Product[] | undefined;
  setError: (msg: string) => void;
}

export const useUpdateProductList = () => {
  const [updateProduct, { isLoading: isUpdatingProducts }] = useUpdateProductListMutation();

  const updateProducts = async ({
    actualProductList,
    orderProducts,
    setError,
    mode,
  }: UpdateProductsProps) => {
    if (!actualProductList) return;

    const updatedProducts = orderProducts
      .map((orderProduct) => {
        const product = actualProductList.find((p) => p.id === orderProduct.id);
        if (!product) return null;

        const { id, quantity, name, price } = product;

        return {
          _id: id,
          price,
          quantity:
            mode === 'decrease'
              ? quantity - orderProduct.quantity
              : quantity + orderProduct.quantity,
          name,
        };
      })
      .filter(Boolean) as ProductUpdateForm[];

    if (!updatedProducts.length) return;

    try {
      await updateProduct(updatedProducts).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении продуктов:', error);
      setError('Ошибка при обновлении продуктов');
    }
  };

  return { updateProducts, isUpdatingProducts };
};
