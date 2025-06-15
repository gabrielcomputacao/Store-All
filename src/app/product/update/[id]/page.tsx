import { FormProduct } from '@/components/formProduct/FormProduct';

export default function Update() {
  return (
    <div>
      <div className="w-full mt-7 mb-10">
        <h1 className=" text-5xl text-amber-700 rounded-xl">
          Atualizar produto
        </h1>
      </div>
      <FormProduct type="update" />
    </div>
  );
}
