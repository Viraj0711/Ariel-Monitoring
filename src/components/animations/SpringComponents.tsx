import { useSpring, animated, useTrail, useInView, config } from '@react-spring/web';
import { ReactNode, useEffect, useState } from 'react';

interface SpringContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: object;
  to?: object;
}

export const SpringContainer = ({ 
  children, 
  className = '', 
  delay = 0,
  from = { opacity: 0, transform: 'translateY(20px)' },
  to = { opacity: 1, transform: 'translateY(0px)' }
}: SpringContainerProps) => {
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const spring = useSpring({
    from,
    to: hasAnimated ? to : from,
    delay,
    config: config.gentle,
  });

  return (
    <animated.div ref={ref} style={spring} className={className}>
      {children}
    </animated.div>
  );
};

interface TrailProps {
  items: ReactNode[];
  className?: string;
  delay?: number;
}

export const SpringTrail = ({ items, className = '', delay = 100 }: TrailProps) => {
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { 
      opacity: hasAnimated ? 1 : 0, 
      transform: hasAnimated ? 'translateX(0px)' : 'translateX(-20px)' 
    },
    config: config.gentle,
    delay,
  });

  return (
    <div ref={ref} className={className}>
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};

interface NumberCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const SpringNumberCounter = ({ 
  value, 
  duration = 2000, 
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}: NumberCounterProps) => {
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: hasAnimated ? value : 0 },
    config: { duration },
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <animated.span>
        {number.to(n => n.toFixed(decimals))}
      </animated.span>
      {suffix}
    </span>
  );
};

interface BouncyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const BouncyButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}: BouncyButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const spring = useSpring({
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    config: config.wobbly,
  });

  return (
    <animated.button
      style={spring}
      className={className}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </animated.button>
  );
};

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export const FlipCard = ({ front, back, className = '' }: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: config.slow,
  });

  const { transform: backTransform, opacity: backOpacity } = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(600px) rotateY(${flipped ? 0 : -180}deg)`,
    config: config.slow,
  });

  return (
    <div 
      className={`relative ${className}`}
      onClick={() => setFlipped(!flipped)}
      style={{ cursor: 'pointer' }}
    >
      <animated.div
        style={{
          opacity: backOpacity,
          transform: backTransform,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
        }}
      >
        {front}
      </animated.div>
      <animated.div
        style={{
          opacity,
          transform,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
        }}
      >
        {back}
      </animated.div>
    </div>
  );
};

interface WaveProgressProps {
  progress: number;
  className?: string;
  color?: string;
  height?: number;
}

export const WaveProgress = ({ 
  progress, 
  className = '', 
  color = '#3b82f6',
  height = 100 
}: WaveProgressProps) => {
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const spring = useSpring({
    from: { width: '0%' },
    to: { width: hasAnimated ? `${progress}%` : '0%' },
    config: config.molasses,
  });

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}
      style={{ height }}
    >
      <animated.div
        style={{
          ...spring,
          height: '100%',
          backgroundColor: color,
          borderRadius: '0.5rem',
        }}
        className="relative"
      >
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.3) 10px,
              rgba(255,255,255,0.3) 20px
            )`,
            animation: 'wave 2s linear infinite',
          }}
        />
      </animated.div>
    </div>
  );
};
