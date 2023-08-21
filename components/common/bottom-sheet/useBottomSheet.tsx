import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { makeSnapPoints } from "./util";
import { bottomSheetConst } from "@/constants/ui";

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
  minY,
  maxY: initMaxY,
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

  const [height, setHeight] = useState<number>(0);
  const maxY = useRef<number>(0);

  const initBottomSheetY = useMemo(
    () => height - bottomSheetConst.INIT_Y,
    [height]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { touchStart } = sheetCoords.current;

    touchStart.sheetY = sheetRef.current?.getBoundingClientRect().y || 0;
    touchStart.touchY = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
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
      let nextY = touchStart.sheetY + touchOffset;

      if (nextY <= minY) {
        nextY = minY;
      }

      if (nextY >= maxY.current) {
        nextY = maxY.current;
      }

      sheetRef.current?.style.setProperty(
        "transform",
        `translateY(${initBottomSheetY + (nextY - maxY.current)}px)`
      );
    },
    [minY, initBottomSheetY]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const { touchMove } = sheetCoords.current;

      const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

      // const { minSnap, maxSnap, snapPoints } = makeSnapPoints(
      //   getSnapPoints ? getSnapPoints(maxY) : [minY, maxY],
      //   maxY
      // );

      if (currentSheetY !== initBottomSheetY) {
        console.log(currentSheetY, initBottomSheetY, touchMove);
        if (touchMove.movingDirection === "down") {
          console.log("down", initBottomSheetY);
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${initBottomSheetY}px)`
          );
        }

        if (touchMove.movingDirection === "up") {
          console.log("up", minY);
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${minY}px)`
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
      };
    },
    [initBottomSheetY, minY]
  );

  useEffect(() => {
    sheetRef.current?.addEventListener("touchstart", handleTouchStart);
    sheetRef.current?.addEventListener("touchmove", handleTouchMove);
    sheetRef.current?.addEventListener("touchend", handleTouchEnd);

    setHeight(window.innerHeight - minY);
    maxY.current = window.innerHeight - initMaxY;

    return () => {
      sheetRef.current?.removeEventListener("touchstart", handleTouchStart);
      sheetRef.current?.removeEventListener("touchmove", handleTouchMove);
      sheetRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart, initMaxY, minY]);

  return {
    sheetRef,
    height,
    initBottomSheetY,
  };
};

export default useBottomSheet;
