import { motion, type MotionValue } from 'framer-motion';
import { PhoneScreen, type PhoneVisual } from './phoneScreens';

type Props = {
  visual: PhoneVisual;
  active: boolean;
  scrollRotate?: MotionValue<number>;
  scrollY?: MotionValue<number>;
};

export function PhoneMock3D({ visual, active, scrollRotate, scrollY }: Props) {
  return (
    <motion.div
      className="phone-3d"
      style={{
        rotateY: scrollRotate,
        y: scrollY,
      }}
    >
      <div className="phone-3d__float">
        <div className="phone-3d__shadow" aria-hidden />

        <div className="phone-3d__device">
          <div className="phone-3d__frame">
            <div className="phone-3d__buttons phone-3d__buttons--left" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="phone-3d__buttons phone-3d__buttons--right" aria-hidden>
              <span />
            </div>

            <div className="phone-3d__screen-stack">
              <div className="phone-3d__display">
                <PhoneScreen visual={visual} active={active} />
                <div className="phone-3d__island" aria-hidden>
                  <span className="phone-3d__island-cam" />
                </div>
                <div className="phone-3d__glass" aria-hidden />
              </div>
              <div className="phone-3d__home-bar" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export type { PhoneVisual };
