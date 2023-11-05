"use client"

import {useAction, useFetch} from "../../helpers/hooks";
import {delAccount, fetchAccountElements, fetchAccounts, patchAccount, postAccount} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Form, Modal} from "antd";
import {useState} from "react";
import FormInput, {HiddenInput} from "../../components/form/input";
import FormSelect from "../../components/form/select";
import FormCheckbox from "../../components/form/checkbox";

const Accounts = () => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchAccounts)
    const [elements] = useFetch(fetchAccountElements)
    const columns = [
        {
            text: "Name",
            dataField: "name",
            formatter: (name, data) => (
                <div className="flex items-center gap-2">
                    {name} {data?.default && (
                    <div>
                        <span className="border border-indigo-500 text-indigo-500 text-[8px] p-1 font-semibold rounded">Default</span>
                    </div>)}
                </div>
            )
        },
        {text: "Currency", dataField: "currency", formatter: (currency) => currency?.name},
        {text: 'Type', dataField: 'type', formatter: (type) => <span className="capitalize">{type}</span>},
        {text: "Balance", dataField: "balance", formatter: (balance) => balance?.toFixed(2)},
    ]


    return (
        <>
            <PageTitle title="Accounts"/>
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
                        currency: values?.currency?._id,
                    })
                    setOpen(true)
                }}
                onDelete={delAccount}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title="Account Details"
                width={800}
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        return useAction(values?.uid ? patchAccount : postAccount, values, () => {
                            setOpen(false)
                            getData()
                        })
                    }}>
                    <div className="grid grid-cols-2 gap-x-4">
                        <HiddenInput name="uid"/>
                        <FormInput label="Name" name="name" required/>
                        <FormInput label="Number" name="number" required/>
                        <FormSelect label="Currency" name="currency" options={elements} required/>
                        <FormSelect
                            label="Type"
                            name="type"
                            options={['Bank', 'Card', 'Cash', 'Other']?.map(d => ({label: d, value: d.toLowerCase()}))}
                        />
                        <FormInput
                            label="Initial Balance"
                            name="initial_balance"
                            type="number"
                            required
                        />
                        <FormInput label="Bank Name" name={['bank', 'name']}/>
                        <FormInput label="Bank Branch" name={['bank', 'branch']}/>
                        <FormInput label="Address" name={['bank', 'address']}/>
                    </div>
                    <FormCheckbox label="Default" name="default" initialValue={false}/>
                    <Button className="mt-2.5">Submit</Button>
                </Form>

            </Modal>

        </>
    )
}

export default Accounts