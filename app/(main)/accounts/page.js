"use client"

import {useFetch} from "../../helpers/hooks";
import {fetchAccounts} from "../../helpers/backend";
import PageTitle from "../../components/common/title";
import Table from "../../components/common/table";
import Button from "../../components/common/button";
import {Modal} from "antd";
import {useState} from "react";

const Accounts = () => {
    const [open, setOpen] = useState(false)
    const [data, getData, {loading}] = useFetch(fetchAccounts)
    const columns = [
        {text: "Name", dataField: "name"},
        {text: "Currency", dataField: "currency", formatter: (currency) => currency?.name},
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
                        onClick={() => setOpen(true)}
                    >Add New</Button>
                )}
                indexed
                pagination
            />

            <Modal open={open} onCancel={() => setOpen(false)} title="Account Details" footer={null}>

            </Modal>

        </>
    )
}

export default Accounts