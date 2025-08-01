"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

import GameList from "./GameList";
import CartForm from "./CartForm";
import CheckoutSummary from "./CheckoutSummary";

import { cn } from "@/shared/lib/utils";
import LinkButton from "@/components/ui/LinkButton";
import LoadingWidgest from "@/components/widgets/LoadingWidgest";

interface CartBodyProp {
  isFormСonfirm: boolean;
  setIsFormСonfirm: (value: boolean) => void;
  setIsOrderComplete: (value: boolean) => void;
}

export default function CartBody({
  isFormСonfirm,
  setIsFormСonfirm,
  setIsOrderComplete,
}: CartBodyProp) {
  const { cart, countTotal, isLoading } = useCartStore();

  const switchToConfirm = () => {
    setIsFormСonfirm(true);
  };

  useEffect(() => {
    countTotal();
  }, [cart, countTotal]);

  return (
    <section className="mb-12 flex flex-col items-center gap-12 px-9 lg:gap-16 lg:px-8 xl:px-[120px]">
      {isFormСonfirm ? (
        <p className="text-3xl font-bold">Оформлення замовлення</p>
      ) : (
        <p className="text-3xl font-bold">Кошик</p>
      )}

      <div className="container">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <LoadingWidgest />
          </div>
        ) : cart.length != 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <GameList isFormСonfirm={isFormСonfirm} />
              {isFormСonfirm && (
                <CheckoutSummary
                  switchToConfirm={switchToConfirm}
                  isFormСonfirm={isFormСonfirm}
                />
              )}
            </div>

            <div
              className={cn(
                "mx-2 flex flex-1 flex-col gap-4 pt-7 lg:mx-6 lg:border-t-[1px] lg:border-gray-400",
                isFormСonfirm && "border-0 pt-0 lg:border-transparent",
              )}
            >
              {!isFormСonfirm ? (
                <CheckoutSummary
                  switchToConfirm={switchToConfirm}
                  isFormСonfirm={isFormСonfirm}
                />
              ) : (
                <CartForm setIsOrderComplete={setIsOrderComplete} />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-9">
            <p className="text-primary text-center font-semibold">
              Кошик пустий, як поле перед першим ходом!
              <br /> Зроби перший хід — обери свою гру!
            </p>
            <LinkButton
              href="/catalog"
              text={"Перейти до каталогу"}
              variant="primary"
            />
          </div>
        )}
      </div>
    </section>
  );
}
