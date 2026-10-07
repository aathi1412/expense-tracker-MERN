import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

function Income() {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    const fetchIncomeDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            if(response.data) setIncomeData(response.data);
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchIncomeDetails();
    }, []);

    const handleAddIncome = async (income) => {
        const {source, amount, date, icon} = income;

        if(!source.trim()){
            toast.error("Source is Required.");
            return;
        }
        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }
        if(!date){
            toast.error("Date is Required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD, {
                source,
                amount,
                date,
                icon: icon ? icon : "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b2.png"
            });
            setOpenAddIncomeModal(false);
            toast.success("Income Added Successfully");
            fetchIncomeDetails();
        } catch (error) {
            toast.error("Error adding income:", error.response?.data?.message || error.message);
        }
    };

    const handleDeleteIncome = async (id) => {

        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE(id));
            
            setOpenDeleteAlert({ show: false, data: null});
            toast.success("Income detail deleted Successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.log("Error deleting income:", error.response?.data?.message || error.message);
            toast.error(
                error.response?.data?.message || "Error adding income"
            );
        }
    };

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Error downloading income details:", error);
            toast.error("Failed to download income details. Please try again");
        }
    };
    
    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({show: true, data: id});
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm
                        onAddIncome={handleAddIncome}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null})}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income detail?"
                        onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}
export default Income
