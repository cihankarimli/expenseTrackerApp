// "use client";

// import { motion } from "framer-motion";

// export default function Modal({
//   children,
//   onClose,
// }: {
//   children: React.ReactNode;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//       <motion.div
//         initial={{ scale: 0.98, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.98, opacity: 0 }}
//         transition={{ duration: 0.18 }}
//         className="bg-gray-800 rounded-lg p-6 w-[92%] md:w-[60%] max-h-[90vh] overflow-y-auto relative shadow-lg text-gray-100"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-300 hover:text-gray-100 text-xl"
//         >
//           ×
//         </button>
//         {children}
//       </motion.div>
//     </div>
//   );
// }
