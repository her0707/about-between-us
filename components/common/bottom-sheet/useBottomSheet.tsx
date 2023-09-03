import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  TouchEvent as ReactTouchEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { makeSnapPoints, isTouchDevice } from "./util";

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
  mouseEnter: {
    sheetY: number;
    screenY: number;
  };
  isMouseDown: boolean;
  mouseMove: {
    prevY: number;
    movingDirection: "none" | "down" | "up";
  };
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
    mouseEnter: {
      sheetY: 0,
      screenY: 0,
    },
    mouseMove: {
      prevY: 0,
      movingDirection: "none",
    },
  });

  const isMoveBottomSheet = useCallback(() => {
    const { touchMove, isContentTouch, mouseMove } = sheetCoords.current;

    if (!isContentTouch) {
      return true;
    }

    if (
      sheetRef.current?.getBoundingClientRect().y !==
      bottomSheetConst.MIN * 2
    ) {
      return true;
    }

    if (
      touchMove.movingDirection === "down" ||
      mouseMove.movingDirection === "down"
    ) {
      return sheetContentRef.current!.scrollTop <= 0;
    }

    return false;
  }, [bottomSheetConst.MIN]);

  const resetSheetData = () => {
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
      mouseEnter: {
        screenY: 0,
        sheetY: 0,
      },
      isMouseDown: false,
      mouseMove: {
        movingDirection: "none",
        prevY: 0,
      },
    };
  };

  // Desktop Event
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { mouseEnter, mouseMove, isMouseDown } = sheetCoords.current;
      if (!isMouseDown) return;

      if (!mouseMove.prevY) {
        mouseMove.prevY = e.clientY;
      }

      if (mouseMove.prevY < e.clientY) {
        mouseMove.movingDirection = "down";
      }

      if (mouseMove.prevY > e.clientY) {
        mouseMove.movingDirection = "up";
      }

      if (isMoveBottomSheet()) {
        e.preventDefault();

        const { MIN, MAX } = bottomSheetConst;

        const offset = e.clientY - mouseEnter.screenY;
        let nextY = mouseEnter.sheetY + offset;

        if (nextY <= MIN * 2) {
          nextY = MIN * 2;
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
    [bottomSheetConst, isMoveBottomSheet]
  );

  const handleMouseUp = useCallback(
    (e: ReactMouseEvent<HTMLDivElement> | MouseEvent) => {
      console.log("mouseup");
      const { mouseMove } = sheetCoords.current;

      const { MIN, MAX } = bottomSheetConst;
      const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

      // const { minSnap, maxSnap, snapPoints } = makeSnapPoints(
      //   getSnapPoints ? getSnapPoints(maxY) : [minY, maxY],
      //   maxY
      // );

      if (currentSheetY !== MIN * 2) {
        if (mouseMove.movingDirection === "down") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${0}px)`
          );
        }

        if (mouseMove.movingDirection === "up") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${MIN * 2 - MAX}px)`
          );
        }
      }
      resetSheetData();
    },
    [bottomSheetConst]
  );

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const { mouseEnter } = sheetCoords.current;
    mouseEnter.screenY = sheetRef.current?.getBoundingClientRect().y || 0;
    mouseEnter.sheetY = e.clientY;
    sheetCoords.current.isMouseDown = true;
  }, []);

  // Mobile Event
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
      console.log(e);

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

        if (nextY <= MIN * 2) {
          nextY = MIN * 2;
        }

        if (nextY >= MAX) {
          nextY = MAX;
        }

        sheetRef.current?.style.setProperty(
          "transform",
          `translateY(${nextY - MAX}px)`
        );
      } else {
        document.body.style.overflowY = "hidden";
      }
    },
    [isMoveBottomSheet, bottomSheetConst]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      document.body.style.overflowY = "auto";
      const { touchMove } = sheetCoords.current;

      const { MIN, MAX } = bottomSheetConst;
      const currentSheetY = sheetRef.current?.getBoundingClientRect().y;

      // const { minSnap, maxSnap, snapPoints } = makeSnapPoints(
      //   getSnapPoints ? getSnapPoints(maxY) : [minY, maxY],
      //   maxY
      // );

      if (currentSheetY !== MIN * 2) {
        if (touchMove.movingDirection === "down") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${0}px)`
          );
        }

        if (touchMove.movingDirection === "up") {
          sheetRef.current?.style.setProperty(
            "transform",
            `translateY(${MIN * 2 - MAX}px)`
          );
        }
      }

      resetSheetData();
    },
    [bottomSheetConst]
  );

  const handleContentTouch = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      sheetCoords.current.isContentTouch = true;
    },
    []
  );

  useEffect(() => {
    setBottomSheetConst((prev) => ({
      ...prev,
      MAX: window.innerHeight - prev.MIN,
      HEIGHT: window.innerHeight - prev.MIN * 2,
    }));
  }, []);

  useEffect(() => {
    sheetRef.current?.addEventListener("touchstart", handleTouchStart);
    sheetRef.current?.addEventListener("touchmove", handleTouchMove);
    sheetRef.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheetRef.current?.removeEventListener("touchstart", handleTouchStart);
      sheetRef.current?.removeEventListener("touchmove", handleTouchMove);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sheetRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  return {
    sheetRef,
    sheetContentRef,
    height: bottomSheetConst.HEIGHT,
    MIN: bottomSheetConst.MIN,
    handleContentTouch,
    mouseHandlers: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
  };
};

export default useBottomSheet;
