import { useEffect, useRef, useState } from "react";
import { makeSnapPoints } from "./util";

interface BottomSheetCoords {
  touchStart: {
    sheetY: number; // BottomSheet 의 최상단 Y 값
    touchY: number; // 터치 지점의 Y 값
  };
  touchMove: {
    prevTouchY?: number; // 이번 터치지점에 대한 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 터치 방향
  };
}

const useBottomSheet = ({
  minHeight,
  maxHeight,
  snapPoints: getSnapPoints,
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetCoords = useRef<BottomSheetCoords>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
  });

  const handleTouchStart = (e: TouchEvent) => {
    const { touchStart } = sheetCoords.current;

    touchStart.sheetY = sheetRef.current?.getBoundingClientRect().y || 0;
    touchStart.touchY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    const { touchMove, touchStart } = sheetCoords.current;
    const currentTouch = e.touches[0];

    if (!touchMove.prevTouchY) {
      touchMove.prevTouchY = touchStart.touchY;
    }

    if (touchMove.prevTouchY < currentTouch.clientY) {
      touchMove.movingDirection = "down";
    }

    if (touchMove.prevTouchY > currentTouch.clientY) {
      touchMove.movingDirection = "up";
    }

    const touchOffset = currentTouch.clientY - touchStart.touchY;
    let nextHeight = window.innerHeight - (touchStart.sheetY + touchOffset);

    if (nextHeight <= minHeight) {
      nextHeight = minHeight;
    }

    if (nextHeight >= maxHeight) {
      nextHeight = maxHeight;
    }

    sheetRef.current?.style.setProperty("height", `${nextHeight}px`);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const { touchMove } = sheetCoords.current;

    const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

    const { minSnap, maxSnap, snapPoints } = makeSnapPoints(
      getSnapPoints ? getSnapPoints(maxHeight) : [minHeight, maxHeight],
      maxHeight
    );

    if (currentSheetY !== window.innerHeight - minHeight) {
      if (touchMove.movingDirection === "down") {
        sheetRef.current?.style.setProperty("height", `${minSnap}px`);
      }

      if (touchMove.movingDirection === "up") {
        sheetRef.current?.style.setProperty("height", `${maxSnap}px`);
      }
    }

    sheetCoords.current = {
      touchStart: {
        sheetY: 0,
        touchY: 0,
      },
      touchMove: {
        prevTouchY: 0,
        movingDirection: "none",
      },
    };
  };

  useEffect(() => {
    sheetRef.current?.addEventListener("touchstart", handleTouchStart);
    sheetRef.current?.addEventListener("touchmove", handleTouchMove);
    sheetRef.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheetRef.current?.removeEventListener("touchstart", handleTouchStart);
      sheetRef.current?.removeEventListener("touchmove", handleTouchMove);
      sheetRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return {
    sheetRef,
  };
};

export default useBottomSheet;
