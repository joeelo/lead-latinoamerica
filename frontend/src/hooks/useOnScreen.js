import { useState, useEffect } from "react"

const useOnScreen = (ref) => {
	const [ intersecting, setIntersecting ] = useState(false);

	const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

	useEffect(() => {
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		}
	}, [])

	return intersecting;
}

export default useOnScreen;