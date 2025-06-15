import CustomTable from '../../components/Table';
import Button from '../../components/Button';

const bookingsData = [
  {
    id: 'B001',
    name: 'John Doe',
    roomNumber: '101',
    checkInDate: '2025-06-10',
    status: 'confirmed'
  },
  {
    id: 'B002',
    name: 'Jane Smith',
    roomNumber: '102',
    checkInDate: '2025-06-11',
    status: 'pending'
  },
  {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  },
   {
    id: 'B003',
    name: 'Alice Johnson',
    roomNumber: '103',
    checkInDate: '2025-06-12',
    status: 'cancelled'
  }
];

export default function BookingsPage() {
  return (
    <div className="p-6">
      <CustomTable
        label="All Bookings"
        data={bookingsData}
        searchKey="name"
        searchPlaceholder="customer name"
        columns={[
          {
            key: 'name',
            label: 'Customer',
            render: (row) => <span className="font-medium">{row.name}</span>
          },
          {
            key: 'roomNumber',
            label: 'Room',
            render: (row) => <span>{row.roomNumber}</span>
          },
          {
            key: 'checkInDate',
            label: 'Check-In',
            render: (row) => <span>{new Date(row.checkInDate).toDateString()}</span>
          },
          {
            key: 'status',
            label: 'Status',
            render: (row) => {
              const color =
                row.status === 'confirmed'
                  ? 'text-green-600'
                  : row.status === 'pending'
                  ? 'text-yellow-600'
                  : 'text-red-600';
              return <span className={`capitalize font-semibold ${color}`}>{row.status}</span>;
            }
          },
          {
            key: 'action',
            label: 'Action',
            render: (row) => (
              <Button
                label="View"
                onClick={() => console.log('Viewing booking', row.id)}
                variant="secondary"
              />
            )
          }
        ]}
      />
    </div>
  );
}
