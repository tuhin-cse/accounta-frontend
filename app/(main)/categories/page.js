"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {
    delCategory,
    fetchCategories,
    fetchCategoryElements,
    patchCategory,
    postCategory,
    postCategoryGenerate
} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormSelect from "../../components/form/select";

const Categories = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchCategories)
    const [elements, getElements] = useFetch(fetchCategoryElements, {}, false)
    const columns = [
        {text: "Name", dataField: "name"},
        {text: "Parent", dataField: "parent", formatter: d => d?.name},
    ]

    const merge = (acc, category, spacer = '') => {
        if (form.getFieldValue('_id') === category._id) return acc
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
            <PageTitle title="Categories"/>
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={(
                   <div className="flex gap-2">
                       <Button
                           onClick={() => {
                               setOpen2(true)
                           }}
                       >Generate</Button>
                       <Button
                           onClick={() => {
                               getElements()
                               form.resetFields()
                               setOpen(true)
                           }}
                       >Add New</Button>
                   </div>
                )}
                onEdit={values => {
                    form.resetFields()
                    form.setFieldsValue({
                        ...values,
                        parent: values?.parent?._id,
                    })
                    setOpen(true)
                }}
                onDelete={delCategory}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Category Details"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.parent = values.parent || undefined
                        return useAction(values?.uid ? patchCategory : postCategory, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <FormInput label="Name" name="name" required/>
                    <FormSelect label="Parent" name="parent" options={options}/>
                    <Button className="mt-2.5">Submit</Button>
                </Form>

            </Modal>


            <Modal
                open={open2}
                onCancel={() => setOpen2(false)}
                title="Generate Categories"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.parent = values.parent || undefined
                        return useAction(postCategoryGenerate, values, () => {
                            setOpen2(false)
                            getData()
                        })
                    }}>
                    <FormInput label="Your Business Type" name="type" required/>
                    <Button className="mt-2.5">Submit</Button>
                </Form>

            </Modal>

        </>
    )
}

export default Categories