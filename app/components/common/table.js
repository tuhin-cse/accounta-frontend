import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {useActionConfirm} from "../../helpers/hooks";
import SearchInput from "../form/search";
import Pagination from "./pagination";

const Table = ({
                   columns,
                   data,
                   indexed,
                   loading = false,
                   noActions,
                   actions,
                   action,
                   onView,
                   onEdit,
                   onDelete,
                   onReload,
                   pagination = false,
                   shadow = true,
                   title,
                   noHeader = false,
                   afterSearch,
                   onSearchChange,
               }) => {

    let cols = noActions ? columns : [...columns, {
        text: 'Action',
        dataField: 'no_actions',
        className: 'w-44 text-right',
        formatter: (noActions, data) => {
            return (
                <div className="flex justify-end gap-2.5">
                    {actions && actions(data)}
                    {onView && (
                        <button className="btn btn-outline-success btn-sm focus:shadow-none"
                                title="View" onClick={() => onView(data)}>
                            <FaEye/>
                        </button>
                    )}
                    {data.disableEdit === 1 && !onView && data.disableDelete === 1 && !actions && '-'}
                    {onEdit && (data?.disableEdit !== 1) && (
                        <button className="border border-indigo-500 text-indigo-500 p-2 rounded hover:bg-indigo-500 hover:text-white focus:shadow-none"
                                title="Edit" onClick={() => onEdit(data)}>
                            <FaPencilAlt size={12}/>
                        </button>
                    )}
                    {onDelete && (data?.disableDelete !== 1) && (
                        <button className="border border-red-500 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white focus:shadow-none"
                                title="Delete" onClick={async () => {
                            await useActionConfirm(
                                onDelete,
                                {uid: data.uid},
                                onReload, 'Are you sure you want to delete this item?', 'Yes, Delete')
                        }}>
                            <FaTrashAlt size={12}/>
                        </button>
                    )}
                </div>
            )
        }
    }]


    return (
        <>
            <div className={`w-full bg-white ${shadow ? 'shadow-lg' : ''} rounded-sm mb-4`}>
                {noHeader || (
                    <header className="px-4 pt-3 pb-2 border-b border-gray-100 flex justify-between flex-wrap">
                        {title ? (
                            <>
                                {typeof title === 'string' ?
                                    <h4 className="text-base font-medium text-gray-700">{title}</h4> : title}
                            </>
                        ) : (
                            <div className="flex flex-wrap">
                                <SearchInput className="w-44" onChange={e => {
                                    onReload({search: e.target.value || undefined, page: 1})
                                    onSearchChange && onSearchChange(e.target.value || '')
                                }}/>
                                {afterSearch}
                            </div>
                        )}
                        {action}
                    </header>
                )}
                <div className="p-3 relative">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase bg-gray-50 text-gray-500">
                            <tr>
                                {indexed && (
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">#</div>
                                    </th>
                                )}
                                {cols?.map((column, index) => (
                                    <th className="p-2 whitespace-nowrap text-left" key={index}>
                                        <div
                                            className={`font-semibold ${column?.className || ''}`}>
                                            {column.text}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td className="h-96 pb-16">
                                        <div className='absolute w-full flex justify-center'>
                                            <div className="loading"/>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {(pagination ? data?.docs : data)?.map((row, index) => (
                                        <tr key={index}>
                                            {indexed && (
                                                <td className="p-2 whitespace-nowrap text-gray-500">
                                                    {(pagination ? (data?.page - 1) * data.limit : 0) + index + 1}
                                                </td>
                                            )}
                                            {cols?.map((column, index) => (
                                                <td className={`p-2 whitespace-nowrap text-gray-700 ${column?.className || ''}`}
                                                    key={index}>
                                                    {column.formatter ? column.formatter(row[column.dataField], row) : (row[column.dataField] || '-')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {pagination && (
                        <div className="pt-3 mt-3 border-t">
                            <Pagination
                                page={data?.page} total={data?.totalDocs}
                                onSizeChange={size => onReload({size})} limit={data?.limit}
                                totalPages={data?.totalPages} onPageChange={page => onReload({page})}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Table