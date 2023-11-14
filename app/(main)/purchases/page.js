"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {delPurchase, fetchPurchaseElements, fetchPurchases, patchPurchase, postPurchase} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal, Select} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormSelect from "../../components/form/select";
import dayjs from "dayjs";
import {FiTrash} from "react-icons/fi";

const Purchases = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchPurchases)
    const [elements, getElements] = useFetch(fetchPurchaseElements)
    const columns = [
        {text: "Uid", dataField: "uid"},
        {text: "Date", dataField: "date", formatter: d => dayjs(d).format('DD/MM/YYYY')},
        {text: "Vendor", dataField: "vendor", formatter: d => d?.name},
        {text: "Products", dataField: "products", formatter: d => d?.length},
        {text: "Subtotal", dataField: "subtotal", formatter: d => d?.toFixed(2)},
        {text: "Total VAT", dataField: "total_vat", formatter: d => d?.toFixed(2)},
        {text: "Discount", dataField: "discount", formatter: d => d?.toFixed(2)},
        {text: "Total", dataField: "total", formatter: d => d?.toFixed(2)},
    ]


    const calculateTotal = () => {
        let products = form.getFieldValue('products') || []
        let subtotal = products.reduce((acc, product) => acc + product.subtotal, 0)
        let vat = +form.getFieldValue('vat') || 0
        let discount = +form.getFieldValue('discount') || 0
        let total_vat = (subtotal * vat) / 100
        let total = subtotal + total_vat - discount
        form.setFieldsValue({
            subtotal: subtotal.toFixed(2),
            total_vat: total_vat.toFixed(2),
            total: total.toFixed(2),
        })
    }

    return (
        <>
            <PageTitle title="Purchases"/>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={(
                    <Button
                        onClick={() => {
                            form.resetFields()
                            setOpen(true)
                        }}
                    >Add New</Button>
                )}
                onEdit={values => {
                    form.resetFields()
                    form.setFieldsValue({
                        ...values,
                        vendor: values?.vendor?._id,
                        date: dayjs(values?.date),
                    })
                    setOpen(true)
                }}
                onDelete={delPurchase}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Purchase Details"
                width={1000}
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.parent = values.parent || undefined
                        return useAction(values?.uid ? patchPurchase : postPurchase, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <FormInput
                            label="Date"
                            name="date"
                            initialValue={dayjs()}
                            type="date"
                            required/>
                        <FormSelect
                            label="Vendor"
                            name="vendor"
                            options={elements?.vendors}
                            required/>
                        <div className="col-span-2">
                            <ProductSelector
                                options={elements?.products}
                                onReload={calculateTotal}
                            />
                        </div>
                        <FormInput name="vat" label="VAT (%)" type="number" initialValue={"0"} onChange={calculateTotal}
                                   required/>
                        <FormInput name="subtotal" label="Subtotal" type="number" readOnly/>
                        <FormInput name="discount" label="Discount" type="number" initialValue={"0"}
                                   onChange={calculateTotal} required/>
                        <FormInput name="total_vat" label="Total Vat" type="number" readOnly/>
                        <FormInput name="paid" label="Paid" type="number" initialValue={"0"} required/>
                        <FormInput name="total" label="Total" type="number" readOnly/>
                    </div>
                    <Button className="mt-2.5">Submit</Button>
                </Form>

            </Modal>

        </>
    )
}

export default Purchases


const ProductSelector = ({label = 'Products', name = 'products', options = [], onReload}) => {
    const Selector = ({value, onChange}) => {
        return (
            <>
                <Select
                    placeholder="Search Products"
                    value=""
                    filterOption={(input, option) => {
                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }}
                    onSelect={selected => {
                        let product = options?.find(d => d?._id === selected)
                        let find = value?.find(d => d._id === product._id)
                        if (find) {
                            find.quantity += 1
                            find.subtotal = find.cost * find.quantity
                            onChange([...value])
                        } else {
                            onChange([...value, {
                                ...product,
                                product: product?._id,
                                quantity: 1,
                                subtotal: product?.cost
                            }])
                        }
                        onReload && onReload()
                    }}
                    showSearch={true}
                >
                    {options?.map((product, index) => (
                        <Select.Option
                            key={index}
                            value={product?.value || product?._id}>
                            {product?.label || product?.name}
                        </Select.Option>
                    ))}
                </Select>

                <table className="table-auto w-full my-4">
                    <thead className="text-xs font-semibold uppercase bg-gray-50 text-gray-500">
                    <tr>
                        <th className="p-2 whitespace-nowrap font-semibold text-left">#</th>
                        <th className="p-2 whitespace-nowrap font-semibold text-left">Product</th>
                        <th className="p-2 whitespace-nowrap font-semibold text-left">Cost</th>
                        <th className="p-2 whitespace-nowrap font-semibold text-left">Quantity</th>
                        <th className="p-2 whitespace-nowrap font-semibold text-right">Total</th>
                        <th className="p-2 whitespace-nowrap font-semibold text-right w-16">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {value?.map((product, index) => (
                        <tr key={index}>
                            <td className="p-2 whitespace-nowrap text-gray-500">{index + 1}</td>
                            <td className="p-2 whitespace-nowrap text-gray-700">{product?.name}</td>
                            <td className="p-2 whitespace-nowrap text-gray-700">
                                <input
                                    value={product?.cost}
                                    type="number"
                                    className="outline-0 w-20"
                                    onChange={e => {
                                        let val = e.target.value
                                        let find = value?.find(d => d._id === product._id)
                                        find.cost = +val || ''
                                        find.subtotal = (+val || 0) * find.quantity
                                        onChange([...value])
                                        onReload && onReload()
                                    }}
                                />
                            </td>
                            <td className="p-2 whitespace-nowrap text-gray-700">
                                <input
                                    value={product?.quantity}
                                    type="number"
                                    className="outline-0 w-20"
                                    onChange={e => {
                                        let val = e.target.value
                                        let find = value?.find(d => d._id === product._id)
                                        find.quantity = +val || ''
                                        find.subtotal = find.cost * (+val || 0)
                                        onChange([...value])
                                        onReload && onReload()
                                    }}
                                />
                            </td>
                            <td className="p-2 whitespace-nowrap text-gray-700 text-right">{product?.subtotal?.toFixed(2)}</td>
                            <td className="p-2 whitespace-nowrap text-right">
                                <FiTrash
                                    role="button"
                                    className="text-red-500 inline-block"
                                    size={18}
                                    onClick={() => {
                                        onChange(value?.filter(d => d._id !== product._id))
                                    }}
                                >Remove</FiTrash>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </>
        )

    }

    return (
        <>
            <Form.Item
                name={name}
                label={label}
                rules={[{required: true, message: 'Please select products'}]}
                className="mb-4"
                initialValue={[]}
            >
                <Selector/>
            </Form.Item>
        </>
    )
}