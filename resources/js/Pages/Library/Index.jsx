import Title from '@/Components/Atoms/Title';
import StatusList from '@/Components/Molecules/StatusList';
import DataTableTest from '@/Components/Organisms/DataTableTest';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const { data, statusCounts } = usePage().props;

    const statusColors = {
        current: 'bg-green-100 text-green-800', // Verde: activo/en progreso
        'want to read': 'bg-blue-100 text-blue-800', // Azul: interés futuro
        completed: 'bg-purple-100 text-purple-800', // Púrpura: logro completado
        'on hold': 'bg-yellow-100 text-yellow-800', // Amarillo: pausa temporal
        dropped: 'bg-red-100 text-red-800', // Rojo: abandonado
        're-reading': 'bg-teal-100 text-teal-800', // Turquesa: revisión/repetición
    };
    console.log({ data, statusCounts });
    const headers = ['Titulo del manga', 'Recomendado', 'Estado'];

    return (
        <GuestLayout className="bg-plumpPurple">
            <Head title="Biblioteca" />
            <section className="my-10 bg-plumpPurpleLight">
                <div className="container py-20">
                    <Title level={2} className="text-plumpPurpleDark">
                        Biblioteca
                    </Title>
                    <div className="flex gap-x-4">
                        {/* <DataTable
                            className="flex-1"
                            data={data}
                            headers={headers}
                            statusColors={statusColors}
                        /> */}

                        <DataTableTest
                            className="flex-1"
                            data={data}
                            headers={headers}
                            statusColors={statusColors}
                        />
                        <StatusList
                            className="w-72"
                            statusColors={statusColors}
                            data={statusCounts}
                        />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
