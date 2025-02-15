import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

interface SpeakerCardProps {
  name: string;
  img: string;
  linkedin: string;
  index: number;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  img,
  linkedin,
  index = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
    once: false,
  });

  return (
    <div ref={ref}>
    <motion.div
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        rotateY: 0,
        },
        hidden: {
        opacity: 0,
        y: -50,
        rotateY: -90,
        rotateZ: index * 10,
        },
      }}
      initial={{ opacity: 0, y: 50, rotateY: 90, rotateZ: index * 10 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -10, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.9 }}
    >
      <Link href={linkedin} className={"w-full h-full"} target="_blank" rel="noreferrer noopener">
        <div className="flex flex-col items-center justify-center p-2 transition-transform duration-300 ease-in-out border-2 border-transparent hover:border-border rounded-xl">
        <Avatar className="w-11/12 h-auto max-w-48 aspect-square">
          <AvatarImage
            src={img}
            alt={name}
            className="w-full aspect-square object-center object-cover"
          />
          <AvatarFallback className="w-full aspect-square flex items-center justify-center">
            {name}
          </AvatarFallback>
        </Avatar>
        <p className="text-center text-lg font-bold mt-2">{name}</p>
        </div>
      </Link>
    </motion.div>
    </div>
  );
};

export default SpeakerCard;
