'use client';
import { useRef } from 'react';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const ArrowUpIcon = ({
	className,
	style,
}: {
	className?: string;
	style?: CSSProperties;
}) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className={className}
		style={style}
	>
		<line x1="12" y1="19" x2="12" y2="5" />
		<polyline points="5 12 12 5 19 12" />
	</svg>
);

interface FooterLink {
	title: string;
	href: string;
}

const navColumn: FooterLink[] = [
	{ title: 'Home', href: '#home' },
	{ title: 'Services', href: '#services' },
	{ title: 'Process', href: '#process' },
	{ title: 'Products', href: '#products' },
	{ title: 'Contact Us', href: '#contact' },
];

const accountColumn: FooterLink[] = [
	{ title: 'Login', href: '/login' },
	{ title: 'Careers', href: '/careers' },
];

const socialColumn: FooterLink[] = [
	{ title: 'Facebook', href: '#' },
	{ title: 'Instagram', href: '#' },
	{ title: 'Tiktok', href: '#' },
];

export function Footer() {
	const reduceMotion = useReducedMotion();
	const footerRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: footerRef,
		offset: ['start end', 'end end'],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 110,
		damping: 28,
		restDelta: 0.001,
	});

	const wordmarkWipe = useTransform(smoothProgress, [0, 0.6], [100, 0]);
	const wordmarkClipPath = useMotionTemplate`inset(0 ${wordmarkWipe}% 0 0)`;

	const glowOpacity = useTransform(smoothProgress, [0.2, 0.8], [0, 1]);
	const glowScale = useTransform(smoothProgress, [0.2, 0.8], [0.92, 1]);

	const buttonOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
	const buttonScale = useTransform(smoothProgress, [0.75, 0.95], [0.85, 1]);

	const handleScrollTop = () => {
		if (typeof window === 'undefined') return;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleInternalNav = () => {
		if (typeof window === 'undefined') return;
		if (window.location.pathname !== '/') return;
		sessionStorage.setItem('lorven:home-scroll-y', String(Math.round(window.scrollY)));
		sessionStorage.setItem(
			'lorven:home-scroll-h',
			String(Math.round(document.documentElement.scrollHeight)),
		);
	};

	return (
		<footer
			ref={footerRef}
			className="relative flex min-h-screen w-full flex-col overflow-hidden px-8 pt-80 pb-16 md:px-12 lg:px-16 lg:pt-96"
		>
			<motion.div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 z-0"
				style={{
					left: '50%',
					x: '-50%',
					width: '85%',
					height: '42%',
					background:
						'radial-gradient(ellipse 90% 65% at 50% 100%, rgba(150,210,255,0.65) 0%, rgba(112,190,250,0.48) 18%, rgba(80,160,220,0.32) 38%, rgba(50,120,180,0.17) 60%, rgba(25,70,125,0.06) 82%, rgba(0,0,0,0) 100%)',
					filter: 'blur(40px)',
					mixBlendMode: 'screen',
					opacity: reduceMotion ? 1 : glowOpacity,
					scale: reduceMotion ? 1 : glowScale,
				}}
			/>

			<div className="relative z-10 grid w-full grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
				<AnimatedContainer className="md:col-span-3">
					<ul className="space-y-4 text-3xl text-[#9c9c9c] md:text-4xl">
						{navColumn.map((link) => (
							<li key={link.title}>
								<a
									href={link.href}
									className="inline-flex items-center transition-colors duration-300 hover:text-white"
								>
									{link.title}
								</a>
							</li>
						))}
					</ul>
				</AnimatedContainer>

				<AnimatedContainer delay={0.1} className="md:col-span-2">
					<ul className="space-y-4 text-3xl text-[#9c9c9c] md:text-4xl">
						{accountColumn.map((link) => (
							<li key={link.title}>
								<Link
									href={link.href}
									onClick={handleInternalNav}
									className="inline-flex items-center transition-colors duration-300 hover:text-white"
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</AnimatedContainer>

				<AnimatedContainer delay={0.2} className="col-span-2 md:col-span-5 md:pl-28 lg:pl-44">
					<div className="space-y-4 text-3xl text-white md:text-4xl">
						<a
							href="mailto:info@lorvenaistudio.com"
							className="block transition-colors duration-300 hover:text-[#70befa]"
						>
							info@lorvenaistudio.com
						</a>
						<a
							href="tel:+919000000000"
							className="block transition-colors duration-300 hover:text-[#70befa]"
						>
							+91 90000 00000
						</a>
						<p className="leading-snug">
							Kamalapuri Colony, Srinagar Colony, Hyderabad, Telangana
						</p>
					</div>
				</AnimatedContainer>

				<AnimatedContainer delay={0.3} className="md:col-span-2 md:justify-self-end">
					<ul className="space-y-4 text-3xl text-white md:text-4xl md:text-right">
						{socialColumn.map((link) => (
							<li key={link.title}>
								<a
									href={link.href}
									className="inline-flex items-center transition-colors duration-300 hover:text-[#70befa]"
								>
									{link.title}
								</a>
							</li>
						))}
					</ul>
				</AnimatedContainer>
			</div>

			<div className="relative z-10 mt-auto">
				<motion.h2
					className="relative select-none whitespace-nowrap leading-[0.85] text-white"
					style={{
						fontFamily: '"Orbitron", "Inter Tight", "Inter", sans-serif',
						fontWeight: 700,
						fontSize: 'clamp(72px, 11.7vw, 235px)',
						letterSpacing: '-0.03em',
						top: '24px',
						scaleY: 1.15,
						transformOrigin: 'bottom center',
						clipPath: reduceMotion ? 'none' : wordmarkClipPath,
					}}
				>
					Lorven AI Studio
				</motion.h2>

				<motion.div
					className="absolute right-4 bottom-0 md:right-12"
					style={{
						opacity: reduceMotion ? 1 : buttonOpacity,
						scale: reduceMotion ? 1 : buttonScale,
					}}
				>
					<button
						type="button"
						onClick={handleScrollTop}
						aria-label="Back to top"
						className="flex aspect-square items-center justify-center rounded-full bg-[#70befa] text-black transition-all duration-300 hover:scale-105 hover:bg-[#8acbff] active:scale-95"
						style={{
							width: 'clamp(64px, 7vw, 140px)',
						}}
					>
						<ArrowUpIcon
							className="text-black"
							style={{ width: 'clamp(22px, 2.4vw, 50px)', height: 'auto' }}
						/>
					</button>
				</motion.div>
			</div>

			<div className="relative z-10 mt-24 flex flex-col items-start justify-between gap-4 text-2xl text-white md:mt-32 md:flex-row md:items-center md:text-3xl">
				<span>© All rights reserved {new Date().getFullYear()}</span>
				<div className="flex gap-10 lg:mr-4">
					<Link
						href="/terms"
						onClick={handleInternalNav}
						className="transition-colors duration-300 hover:text-white"
					>
						Terms and Conditions
					</Link>
					<Link
						href="/privacy"
						onClick={handleInternalNav}
						className="transition-colors duration-300 hover:text-white md:ml-16 lg:ml-20"
					>
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className as string | undefined}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
