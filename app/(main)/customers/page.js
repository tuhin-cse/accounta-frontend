"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {delCurrency, delCustomer, fetchCustomers, patchCustomer, postCustomer} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";

const Customers = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchCustomers)
    const columns = [
        {text: "Name", dataField: "name"},
        {text: "Email", dataField: "email"},
        {text: "Phone", dataField: "phone"},
        {text: "Address", dataField: "address"},
    ]


    return (
        <>
            <PageTitle title="Customers"/>
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
                    form.setFieldsValue(values)
                    setOpen(true)
                }}
                onDelete={delCustomer}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Customer Details"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        return useAction(values?.uid ? patchCustomer : postCustomer, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <FormInput label="Name" name="name" required/>
                    <FormInput label="Email" name="email" isEmail required/>
                    <FormInput label="Phone" name="phone" required/>
                    <FormInput label="Address" name="address"/>
                    <Button className="mt-3">Submit</Button>
                </Form>
            </Modal>
        </>
    )
}

export default Customers