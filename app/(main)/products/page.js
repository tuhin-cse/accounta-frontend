"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {
    delCategory, delProduct,
    fetchCategories,
    fetchCategoryElements,
    fetchProducts,
    patchCategory, patchProduct,
    postCategory, postProduct
} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormSelect from "../../components/form/select";

const Products = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchProducts)
    const [elements, getElements] = useFetch(fetchCategoryElements, {}, false)
    const columns = [
        {text: "Name", dataField: "name"},
        {text: "Category", dataField: "category", formatter: d => d?.name},
        {text: "Cost", dataField: "cost"},
        {text: "Price", dataField: "price"},
    ]

    const merge = (acc, category, spacer = '') => {
        acc.push({
            value: category._id,
            label: `${spacer}${(category.name)}`
        })
        if (category?.children) {
            category?.children.forEach(child => {
                acc = merge(acc, child, `${spacer} - `)
            })
        }
        return acc
    }
    let options = elements?.reduce((acc, category) => merge(acc, category), [])


    return (
        <>
            <PageTitle title="Products"/>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={(
                    <Button
                        onClick={() => {
                            getElements()
                            form.resetFields()
                            setOpen(true)
                        }}
                    >Add New</Button>
                )}
                onEdit={values => {
                    form.resetFields()
                    form.setFieldsValue({
                        ...values,
                        category: values?.category?._id,
                    })
                    setOpen(true)
                }}
                onDelete={delProduct}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Product Details"
                width={800}
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.parent = values.parent || undefined
                        return useAction(values?.uid ? patchProduct : postProduct, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <FormInput label="Name" name="name" required/>
                        <FormSelect label="Category" name="category" options={options} required/>
                        <FormInput label="Price" name="price" required/>
                        <FormInput label="Cost" name="cost" required/>
                        <FormInput label="Description" name="description" textArea required/>
                        <FormSelect
                            label="Type"
                            name="type"
                            initialValue="product"
                            options={['Product', 'Service']?.map(d => ({
                                label: d,
                                value: d.toLowerCase()
                            }))}
                            required/>
                    </div>

                    <Button className="mt-2.5">Submit</Button>
                </Form>

            </Modal>

        </>
    )
}

export default Products