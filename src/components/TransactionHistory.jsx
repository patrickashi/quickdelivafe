import React from "react";

/**
 * Reusable Transaction History Table (fully responsive)
 * @param {Array} transactions - array of order objects
 */
export default function TransactionHistory({ transactions = [] }) {
  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 md:p-5 lg:p-6 font-comfortaa">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        Transaction History
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic py-6 sm:py-8 text-sm sm:text-base">
          No transactions yet.
        </p>
      ) : (
        <>
          {/* Mobile Card View (< 640px) */}
          <div className="block sm:hidden space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <StatusBadge status={txn.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(txn.created_at)}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide block mb-0.5">
                      Pickup
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-xs leading-relaxed">
                      {txn.pickup_address || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide block mb-0.5">
                      Delivery
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-xs leading-relaxed">
                      {txn.delivery_address || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide block mb-0.5">
                      Description
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 text-xs leading-relaxed">
                      {txn.package_description || "No description"}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                    <span className="text-quickdeliva font-bold text-base">
                      ₦{Number(txn.delivery_amount || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Small Tablet Compact Cards (640px - 768px) */}
          <div className="hidden sm:block md:hidden space-y-2">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={txn.status} />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(txn.created_at)}
                      </span>
                    </div>
                  </div>
                  <span className="text-quickdeliva font-bold text-sm ml-2 whitespace-nowrap">
                    ₦{Number(txn.delivery_amount || 0).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-0.5">
                      Pickup
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {txn.pickup_address || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-0.5">
                      Delivery
                    </span>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {txn.delivery_address || "—"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <span className="text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-0.5">
                      Description
                    </span>
                    <p className="text-gray-800 dark:text-gray-200">
                      {txn.package_description || "No description"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medium Tablet Scrollable Table (768px - 1024px) */}
          <div className="hidden md:block lg:hidden">
            <div className="overflow-x-auto -mx-5 px-5 pb-2">
              <table className="min-w-[700px] w-full text-xs border-separate border-spacing-y-1.5">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <th className="p-2 whitespace-nowrap">Pickup</th>
                    <th className="p-2 whitespace-nowrap">Delivery</th>
                    <th className="p-2 whitespace-nowrap">Description</th>
                    <th className="p-2 whitespace-nowrap">Amount</th>
                    <th className="p-2 whitespace-nowrap">Status</th>
                    <th className="p-2 whitespace-nowrap">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 hover:dark:bg-gray-700 transition"
                    >
                      <td className="p-2 text-gray-800 dark:text-gray-200 whitespace-nowrap max-w-[120px] truncate">
                        {txn.pickup_address || "—"}
                      </td>
                      <td className="p-2 text-gray-800 dark:text-gray-200 whitespace-nowrap max-w-[120px] truncate">
                        {txn.delivery_address || "—"}
                      </td>
                      <td className="p-2 text-gray-800 dark:text-gray-200 max-w-[140px] truncate">
                        {txn.package_description || "No description"}
                      </td>
                      <td className="p-2 text-quickdeliva font-semibold whitespace-nowrap">
                        ₦{Number(txn.delivery_amount || 0).toLocaleString()}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <StatusBadge status={txn.status} size="sm" />
                      </td>
                      <td className="p-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {formatDate(txn.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Large Desktop Full Table (≥ 1024px) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                  <th className="p-3 whitespace-nowrap">Pickup Address</th>
                  <th className="p-3 whitespace-nowrap">Delivery Address</th>
                  <th className="p-3 whitespace-nowrap">Description</th>
                  <th className="p-3 whitespace-nowrap">Amount (₦)</th>
                  <th className="p-3 whitespace-nowrap">Status</th>
                  <th className="p-3 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 hover:dark:bg-gray-700 transition"
                  >
                    <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {txn.pickup_address || "—"}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {txn.delivery_address || "—"}
                    </td>
                    <td className="p-3 text-gray-800 dark:text-gray-200 max-w-xs">
                      {txn.package_description || "No description"}
                    </td>
                    <td className="p-3 text-quickdeliva font-semibold whitespace-nowrap">
                      {Number(txn.delivery_amount || 0).toLocaleString()}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <StatusBadge status={txn.status} />
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(txn.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

/* 🎨 Status badge */
function StatusBadge({ status, size = "default" }) {
  const base = `${
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
  } font-semibold rounded-full shadow-sm whitespace-nowrap inline-block`;
  
  switch (status) {
    case "Delivered":
      return (
        <span
          className={`${base} bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100`}
        >
          Delivered
        </span>
      );
    case "Pending":
      return (
        <span
          className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100`}
        >
          Pending
        </span>
      );
    case "In Transit":
      return (
        <span
          className={`${base} bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100`}
        >
          In Transit
        </span>
      );
    case "Cancelled":
      return (
        <span
          className={`${base} bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100`}
        >
          Cancelled
        </span>
      );
    default:
      return (
        <span
          className={`${base} bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-100`}
        >
          {status || "Unknown"}
        </span>
      );
  }
}