export default function Table({transactions}) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
        </div>
        <div className="flex flex-col mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-blue-600 ring-opacity-5 md:rounded-lg">
                <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                  <thead className="bg-blue-600">
                    <tr className="divide-x divide-white">
                      <th
                        scope="col"
                        className="sticky whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="sticky whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="sticky whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="sticky whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="sticky whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-grey">
                    {transactions.map((transaction, index) => (
                      <tr className="divide-x divide-grey-500" key={index}>
                        <td className="py-2 pl-4 pr-3 text-sm text-gray-900 whitespace-nowrap sm:pl-6">
                          {transaction.addressTo}
                        </td>
                        <td className="px-2 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {transaction.addressFrom}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">{transaction.timestamp}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">{transaction.message}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 whitespace-nowrap">{transaction.amount} ETH</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }