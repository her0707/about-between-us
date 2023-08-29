import { useCallback, useEffect, useRef, useState, useMemo } from "react";
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
  isContentTouch: boolean;
}

interface BottomSheetConst {
  MIN: number;
  MAX: number;
  HEIGHT: number;
}

const useBottomSheet = ({ snapPoints: getSnapPoints }: BottomSheetProps) => {
  const [bottomSheetConst, setBottomSheetConst] = useState<BottomSheetConst>({
    MIN: 100,
    MAX: 0,
    HEIGHT: 0,
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  const sheetCoords = useRef<BottomSheetCoords>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentTouch: false,
  });

  const isMoveBottomSheet = useCallback(() => {
    const { touchMove, isContentTouch } = sheetCoords.current;

    if (!isContentTouch) {
      return true;
    }

    if (sheetRef.current?.getBoundingClientRect().y !== bottomSheetConst.MIN) {
      return true;
    }

    if (touchMove.movingDirection === "down") {
      return sheetContentRef.current
        ? sheetContentRef.current.scrollTop <= 0
        : false;
    }

    return false;
  }, [bottomSheetConst.MIN]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { touchStart } = sheetCoords.current;

    touchStart.sheetY = sheetRef.current?.getBoundingClientRect().y || 0;
    touchStart.touchY = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const { touchMove, touchStart } = sheetCoords.current;
      const { MIN, MAX } = bottomSheetConst;
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

      if (isMoveBottomSheet()) {
        e.preventDefault();
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextY = touchStart.sheetY + touchOffset;

        if (nextY <= MIN) {
          nextY = MIN;
        }

        if (nextY >= MAX) {
          nextY = MAX;
        }

        sheetRef.current?.style.setProperty(
          "transform",
          `translateY(${nextY - MAX}px)`
        );
      }
    },
    [isMoveBottomSheet, bottomSheetConst]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const { touchMove } = sheetCoords.current;

      const { MIN, MAX } = bottomSheetConst;
      const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

      // const { minSnap, maxSnap, snapPoints } = makeSnapPoints(
      //   getSnapPoints ? getSnapPoints(maxY) : [minY, maxY],
      //   maxY
      // );

      if (currentSheetY !== MIN) {
        if (touchMove.movingDirection === "down") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${0}px)`
          );
        }

        if (touchMove.movingDirection === "up") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${MIN - MAX}px)`
          );
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
        isContentTouch: false,
      };
    },
    [bottomSheetConst]
  );

  const handleContentTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();

    sheetCoords.current.isContentTouch = true;
  }, []);

  useEffect(() => {
    setBottomSheetConst((prev) => ({
      ...prev,
      MAX: window.innerHeight - 200,
      HEIGHT: window.innerHeight - 200,
    }));
  }, []);

  useEffect(() => {
    sheetRef.current?.addEventListener("touchstart", handleTouchStart);
    sheetRef.current?.addEventListener("touchmove", handleTouchMove);
    sheetRef.current?.addEventListener("touchend", handleTouchEnd);

    sheetContentRef.current?.addEventListener("touchstart", handleContentTouch);
    sheetContentRef.current?.addEventListener("touchend", handleContentTouch);

    return () => {
      sheetRef.current?.removeEventListener("touchstart", handleTouchStart);
      sheetRef.current?.removeEventListener("touchmove", handleTouchMove);
      sheetRef.current?.removeEventListener("touchend", handleTouchEnd);
      sheetContentRef.current?.removeEventListener(
        "touchstart",
        handleContentTouch
      );
      sheetContentRef.current?.removeEventListener(
        "touchend",
        handleContentTouch
      );
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart, handleContentTouch]);

  return {
    sheetRef,
    sheetContentRef,
    height: bottomSheetConst.HEIGHT,
  };
};

export default useBottomSheet;
