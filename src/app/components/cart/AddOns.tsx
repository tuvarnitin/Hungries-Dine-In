import React from 'react'

const AddOns = () => {
// const toggleAddons = (id: string) => {
// 	setItems((prev) =>
// 		prev.map((item) => {
// 			if (item.id === id) {
// 				return { ...item, addonsOpen: !item.addonsOpen };
// 			}
// 			return item;
// 		}),
// 	);
// };

// const toggleAddonCheckbox = (itemId: string, addonId: string) => {
// 	setItems((prev) =>
// 		prev.map((item) => {
// 			if (item.id === itemId && item.addons) {
// 				const updatedAddons = item.addons.map((addon) =>
// 					addon.id === addonId ? { ...addon, checked: !addon.checked } : addon,
// 				);
// 				return { ...item, addons: updatedAddons };
// 			}
// 			return item;
// 		}),
// 	);
// };

// return <div className="border border-gold/20 rounded-2xl overflow-hidden transition-all">
//     <button
//         onClick={() => toggleAddons(item.id)}
//         className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-100/50 transition-colors"
//     >
//         <span>Ad Ons</span>
//         {item.addonsOpen ? (
//             <ChevronUp className="w-4 h-4 text-primary" />
//         ) : (
//             <ChevronDown className="w-4 h-4 text-primary" />
//         )}
//     </button>

//     {item.addonsOpen && item.addons && (
//         <div className="px-3 pb-3 space-y-2">
//             {item.addons.map((addon) => (
//                 <div
//                     key={addon.id}
//                     onClick={() => toggleAddonCheckbox(item.id, addon.id)}
//                     className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-md border border-neutral-200/60 cursor-pointer hover:border-neutral-300 transition-colors shadow-2xs"
//                 >
//                     <span className="text-xs font-medium text-neutral-800">
//                         {addon.name}
//                     </span>
//                     <div
//                         className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
//                             addon.checked
//                                 ? "bg-[#0A3622] border-[#0A3622] text-white"
//                                 : "border-neutral-300 bg-white"
//                         }`}
//                     >
//                         {addon.checked && (
//                             <span className="text-[10px] font-bold">✓</span>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )}
// </div> 
// }
return
};

export default AddOns