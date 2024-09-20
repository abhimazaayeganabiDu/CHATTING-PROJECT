import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/Admin/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampleData'
import { Avatar, Stack, Container, } from '@mui/material'
import { transformImage } from '../../lib/features'
import AvatarCard from '../../components/shared/AvatarCard'


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: "200"
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: "150",
    renderCell: (params) =>
      <AvatarCard
        avatar={params.row.avatar}
      />

  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: "300"
  },
  {
    field: "totalMembers",
    headerName: "TotalMembers",
    headerClassName: "table-header",
    width: "120",

  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: "400",
    renderCell: (params) => <AvatarCard
      max={100}
      avatar={params.row.members}

    />
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: "200"
  },
  {
    field: "creater",
    headerName: "Created By",
    headerClassName: "table-header",
    width: "250",
    renderCell:(params) => (
      <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      >
<Avatar
  alt={params.row.creater.name}
  src={params.row.creater.avatar}
/>
<span> {params.row.creater.name} </span>
      </Stack>
    )
  },
]


function ChatManagement() {

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(dashboardData.chats.map(i => ({
      ...i,
      id:i._id,
      avatar:i.avatar.map(j=>transformImage(j,50)),
      members:i.members.map((i) =>transformImage(i.avatar,50)),
      creater: {
        name: i.creater.name,
        avatar:transformImage(i.creater.avatar,50)
      }
    })))
  },
    []
  )

  return (
    <AdminLayout>
      <div>
        <Table
          heading={"All Chats"}
          columns={columns}
          rows={rows}
        />
      </div>
    </AdminLayout>
  )
}

export default ChatManagement