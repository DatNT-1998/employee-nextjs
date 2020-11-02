import React, { Component } from "react";
import { Table, Space, Modal, Input, Button, Form, Popconfirm } from "antd";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { connect } from 'react-redux';
import { addEmployee, setListEmployee, delEmployee, updateEmployee } from "../../redux/employee/employee.action";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../../styles/Home.module.css';


// import { withAuth0 } from '@auth0/auth0-react';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 16,
        span: 8,
    },
};


class employee extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isAddNew: false,
            employee: {
                key: '',
                name: '',
                dateOfBirth: '',
                adress: '',
            },
            dataEmployees: [],
            activeKey: ""
        };

        this.biggestId = 0;
        // this.validateMessages = {
        //     required: 'Value is not null',
        //     types: {
        //         'date': 'Value is not validate date!',
        //         'number': 'Value is not a validate number!',
        //     },
        //     number: {
        //         'range': 'Value must be between 0 and 1000000000',
        //     },
        // };
    }

    columns = [
        {
            align: "center",
            title: "STT",
            dataIndex: "index",
            key: "index",
            // render: () => (this.props.employees.map((item,
            //   index) => (<div key={index}>{index + 1}</div>)))
        },
        {
            align: "center",
            title: "Tên nhân viên",
            dataIndex: "name",
            key: "name",
        },
        {
            align: "center",
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            align: "center",
            title: "Quê Quán",
            dataIndex: "adress",
            key: "adress",
        },
        {
            align: "center",
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <FaPencilAlt className={styles.styledIcon} onClick={() => this.showModalDetail(record)} />
                    <Popconfirm placement="leftTop" title="Bạn chắc chắn muốn xóa nhân viên này ?" onConfirm={() => this.handleDelete(record)} onCancel={this.handleCancelModalDel} okText="Yes" cancelText="No"><Button className="btn-delete" shape="circle" type="button" ><FaTrashAlt /></Button></Popconfirm>

                    {/* <FaTrashAlt className="styled-icon" onClick={() => this.showModalBan(record)} /> */}
                </Space>
            ),
        },
    ];

    componentDidMount() {

        fetch("https://5f851ca6c29abd0016190236.mockapi.io/api/v1/emloyees")
            .then(data => data.json())
            .then(res => {
                let temp = res;
                temp.map((data, index) => (data.index = index + 1))
                this.props.setListEmployee(res);

                this.biggestId = res[res.length - 1].key;
            })
    }

    onFinish = values => {
        const { isAddNew } = this.state;
        if (isAddNew) {
            this.handleAddEmployee();
        } else {
            this.handleUpdateEmployee();
        }
    };

    showModalDetail = (record) => {
        const that = this;
        debugger
        this.setState({
            visible: true,
            isAddNew: false,
            employee: {
                key: record.key,
                name: record.name,
                dateOfBirth: record.dateOfBirth,
                adress: record.adress
            },
            activeKey: record.key
        })
    }

    showModalAdd = () => {
        this.setState({
            visible: true,
            isAddNew: true
        }, () => {
            this.formRef.current.setFieldsValue({
                username: '',
                dateOfBirth: '',
                adress: '',
            })
        })
        // this.formRef.current.
        // this.setState({

        //     isAddNew: true,
        //     employee: {
        //         key: '',
        //         name: '',
        //         dateOfBirth: '',
        //         adress: '',
        //     }
        // });

    };

    handleCancel = () => {
        this.setState({
            visible: false,
            employee: {
                key: '',
                name: '',
                dateOfBirth: '',
                adress: '',
            }
        });

        // this.formRef.current.setFieldsValue({
        //     username: '',
        //     dateOfBirth: '',
        //     adress: '',
        // });
    };

    handleCancelModalDel = () => {
    }

    handleDelete = (record) => {
        this.props.delEmployee(record);
        toast.success('Delete employee success');
    }

    handleChange = (evt) => {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    };

    handleAddEmployee = () => {
        const fieldValue = this.formRef.current.getFieldsValue();
        this.props.addEmployee({
            key: ++this.biggestId,
            name: fieldValue.username,
            dateOfBirth: fieldValue.dateOfBirth,
            adress: fieldValue.adress
        })
        this.setState({
            visible: false
        })
        toast.success('Add employee success');

    }

    handleUpdateEmployee = () => {
        const fieldValue = this.formRef.current.getFieldsValue();
        this.props.updateEmployee({
            key: this.state.activeKey,
            name: fieldValue.username,
            dateOfBirth: fieldValue.dateOfBirth,
            adress: fieldValue.adress
        })
        toast.success('Edit employee success');
        this.setState({
            visible: false,
            employee: {
                key: '',
                name: '',
                dateOfBirth: '',
                adress: '',
            }
        })
        // this.formRef.current.resetFields()
        // // this.formRef.current.setFieldsValue({
        // //     username: '',
        // //     dateOfBirth: '',
        // //     adress: '',
        // // });

    }

    render() {
        const { isAddNew, visible, employee } = this.state;
        const { employees } = this.props;
        return (
            <div className="admin-management">

                <>
                    <div className="feature-add">
                        <h2> Danh sách nhân viên </h2>
                        <div style={{ display: "flex", marginBottom: "16" }} onClick={this.showModalAdd}>
                            <MdAddCircle size="20" className={styles.styledIcon} />
                            <span style={{ marginLeft: 4 }} className={styles.styledIcon}> Thêm nhân viên</span>
                        </div>
                    </div>

                    <Table dataSource={employees} columns={this.columns} bordered />
                    <ToastContainer autoClose={2000} />

                    {/* Modal Add and Detail */}

                    <Modal
                        title={
                            isAddNew ? 'Thêm nhân viên' : 'Sửa thông tin nhân viên'
                        }
                        visible={visible}
                        footer={null}
                        onCancel={this.handleCancel}
                        key={this.state.activeKey}
                    >
                        <Form ref={this.formRef} name="dynamic_rule" {...layout} onFinish={this.onFinish} initialValues={{ username: employee.name, dateOfBirth: employee.dateOfBirth, adress: employee.adress }} >
                            <Form.Item label="Tên nhân viên" name="username" rules={[{ required: true, message: " Username is not null " }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true, message: "Select a date" }]}>
                                <Input type="date" />
                            </Form.Item>
                            <Form.Item label="Quê quán" name="adress" rules={[{ required: true, message: " Adress is not null " }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout} style={{ marginBottom: '12px' }}>
                                <Button type="primary" onClick={this.handleCancel} style={{ width: '64px' }} >
                                    Hủy
                                </Button>
                                <Button type="primary" style={{ marginLeft: 12, width: '64px' }} htmlType="submit">
                                    {isAddNew ? 'Thêm' : 'Lưu'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        employees: state.employee.employees
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setListEmployee: (data) => dispatch(setListEmployee(data)),
        addEmployee: (item) => dispatch(addEmployee(item)),
        delEmployee: (item) => dispatch(delEmployee(item)),
        updateEmployee: (item) => dispatch(updateEmployee(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(employee);
