import { useState, useEffect } from "react"

const useOnScreen = (ref, rootMargin  = '0px') => {
	const [ intersecting, setIntersecting ] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				setIntersecting(entry.isIntersecting);
			},
			{ rootMargin });
			if (ref.current) {
				observer.observe(ref.current);
			}
			return () => {
				observer.unobserve(ref.current);
			};
		}, []);

	return intersecting;
}

export default useOnScreen;