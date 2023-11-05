"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {delCurrency, fetchCurrencies, patchCurrency, postCurrency} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";

const Currencies = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchCurrencies)
    const columns = [
        {text: "Name", dataField: "name"},
        {text: "Code", dataField: "code"},
        {text: "Symbol", dataField: "symbol"},
        {text: "Rate", dataField: "rate"},
    ]


    return (
        <>
            <PageTitle title="Currencies"/>
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
                onDelete={delCurrency}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Currency Details"
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        return useAction(values?.uid ? patchCurrency : postCurrency, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <HiddenInput name="uid"/>
                    <FormInput label="Name" name="name" required/>
                    <FormInput label="Code" name="code" required/>
                    <FormInput label="Symbol" name="symbol" required/>
                    <FormInput label="Rate" name="rate" required/>
                    <Button className="mt-3">Submit</Button>
                </Form>

            </Modal>

        </>
    )
}

export default Currencies