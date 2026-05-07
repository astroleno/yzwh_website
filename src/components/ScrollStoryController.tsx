import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ScrollStoryController: React.FC = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const timelines: gsap.core.Timeline[] = [];
      const flight = document.querySelector<HTMLElement>("[data-scroll-scene='flight']");
      if (flight) {
        const route = flight.querySelector<SVGPathElement>("[data-flight-route]");
        const points = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-point]"));
        const drone = flight.querySelector<HTMLElement>("[data-flight-drone]");
        const layers = gsap.utils.toArray<HTMLElement>(flight.querySelectorAll("[data-flight-layer]"));

        if (route) {
          const routeLength = route.getTotalLength();
          gsap.set(route, {
            strokeDasharray: routeLength,
            strokeDashoffset: routeLength,
            opacity: 1,
          });
        }

        gsap.set(points, { autoAlpha: 0, scale: 0.62, transformOrigin: "50% 50%" });
        if (drone) {
          gsap.set(drone, { autoAlpha: 0, scale: 0.9, y: 18, transformOrigin: "50% 50%" });
        }
        gsap.set(layers, { autoAlpha: 0, y: 32 });

        const flightTl = gsap.timeline({
          scrollTrigger: {
            trigger: flight,
            start: "top top+=64",
            end: "+=180%",
            pin: true,
            pinSpacing: "margin",
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        timelines.push(flightTl);
        flightTl.addLabel("route", 0);
        flightTl.addLabel("points", 0.35);
        flightTl.addLabel("data", 0.70);

        if (route) {
          flightTl.to(route, { strokeDashoffset: 0, ease: "none", duration: 0.35 }, "route");
        }

        flightTl.to(points, { autoAlpha: 1, scale: 1, stagger: 0.06, ease: "back.out(1.8)", duration: 0.24 }, "points");

        if (drone) {
          flightTl.to(drone, { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.24 }, "points+=0.04");
        }

        flightTl.to(layers, { autoAlpha: 1, y: 0, stagger: 0.08, ease: "power2.out", duration: 0.28 }, "data");
      }

      return () => {
        timelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return null;
};
