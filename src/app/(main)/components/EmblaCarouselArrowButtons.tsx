import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="text-primary transition-transform hover:scale-110 disabled:opacity-50"
      // className="z-[1] m-0 flex h-[3.6rem] w-[3.6rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 text-[color:var(--text-body)] no-underline [box-shadow:inset_0_0_0_0.2rem_var(--color-primary)] [--tw-text-opacity:1] disabled:text-[var(--color-card)]"
      type="button"
      {...restProps}
    >
      <svg className="h-5 w-5 text-[#2B1047]">
        <use href="/icon/sprite.svg#icon-arrow-left"></use>
      </svg>
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="text-primary transition-transform hover:scale-110 disabled:opacity-50"
      // className="z-[1] m-0 flex h-[3.6rem] w-[3.6rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 text-[color:var(--text-body)] no-underline [box-shadow:inset_0_0_0_0.2rem_var(--color-primary)] [--tw-text-opacity:1] disabled:text-[var(--color-card)]"
      type="button"
      {...restProps}
    >
      <svg className="h-5 w-5 text-[#2B1047]">
        <use href="/icon/sprite.svg#icon-arrow-right"></use>
      </svg>
      {children}
    </button>
  );
};
