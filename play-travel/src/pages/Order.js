import React, { Component } from 'react';
import '../scss/Orderlist.css';
import '../icon/iconfont.css';
import { get } from '../api/myweb';




class Order extends Component {
    // console.log(this)
    state = {
        currentIdx: 0,
        data: [],
        deletebutton: false,
        navlist: ['全部订单', '待付款', '处理中', '已确认', '已退订'],
        datalist: []
    }

    changeNav = (idx) => {
        if (idx === 0) {
            this.setState({
                data: this.state.datalist.length ? this.state.datalist : ""
            })
        } else if (idx === 1) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '1') : ''
            })
        } else if (idx === 2) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '2') : ''
            })
        } else if (idx === 3) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '3') : ''
            })
        } else if (idx === 1) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '4') : ''
            })
        }


        this.setState({
            currentIdx: idx,

        })
    }
    deleteItem = (id) => {
        this.setState({
            deletebutton: true
        })
    }
    cancelDelete = () => {
        this.setState({
            deletebutton: false
        })
    }
    confirmDelete = (id) => {
        let data = this.state.datalist.filter(item => item.order_id !== id)
        this.setState({
            data,
            deletebutton: false
        })
    }

    async componentDidMount() {

        let { data } = await get('/order')
        this.setState({
            datalist: data,
            data
        })

    }

    getDetail = (id) => {
        this.props.history.push(`/order/${id}`)
    }

    cancelOrder = (id, event) => {

        console.log(id, event)
        event.stopPropagation()
        let result = window.confirm('确定要取消此订单么');
        if (result) {
            this.setState({
                datalist: this.state.datalist.map(item => {
                    if (item.order_id === id) {
                        item.status_id = '25';
                        item.status_name = "订单取消"
                    }
                    return item;
                })
            })
            window.alert('订单已取消')
        }
    }




    render() {
        let { navlist, currentIdx, data } = this.state
        return < div className="order_list" >
            <div className="order_nav">
                <h2>我的订单</h2>
                <ul className="nav_item">
                    {navlist.map((item, index) => {
                        return <li className={index === currentIdx ? "active" : ""} key={item} onClick={this.changeNav.bind(this, index)}><span>{item}</span></li>
                    })}
                </ul>
            </div>
            {
                data.length ?
                    <div className="order_item">
                        {data.map((item) => {
                            return <div
                                className={item.status_id === '25' ? "single_item_overdue single_item" : "single_item"}
                                key={item.order_id}
                                onClick={item.status_id === '1' ? this.getDetail.bind(this, item.order_id) : () => { }}

                            >
                                <div className="item_top">
                                    <p className="clearfix first_line ">
                                        <span className="item_status">{item.status_name}</span>
                                        <span className="item_price">￥{item.total}</span>
                                    </p>
                                    <p className="second_line clearfix">
                                        <span className='order_num fl'>订单号:{item.order_id}</span>
                                        <span className="pay_limit fr">请在{item.payment_time_limit.slice(10, 16)}前支付</span>
                                    </p>
                                </div>
                                <div className="item_center">
                                    <p className="item_title">{item.product_name}</p>
                                    <p className="item_time">出行日期:{item.tour_date}</p>
                                    <p className="item_mount">购买数量:套餐份数×1</p>

                                </div>
                                <div className="item_footer">
                                    <span className="cancel_order" onClick={this.cancelOrder.bind(this, item.order_id)}>取消订单</span>
                                    <span className="to_pay">去支付</span>
                                    <p className="item_delete" onClick={this.deleteItem}><span className='iconfont icon-shanchu' ></span>删除订单</p>
                                </div>
                                <div className="deletepopup" style={{ display: this.state.deletebutton ? "block" : 'none' }}>
                                    <div className="delete_mes">
                                        <h5 className="delete_title">删除订单</h5>
                                        <p className="delete_content">确定删除订单吗？删除后订单将不可恢复</p>
                                        <div className='delete_button'><span className="canceldelete" onClick={this.cancelDelete}>取消</span><span className="confirmdelete" onClick={this.confirmDelete.bind(this, item.order_id)}>删除</span></div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div> : <div className="noorder"><span className="iconfont icon-zanwuxiangguandingdan icon"></span>
                        <p>暂未找到相关订单</p></div>

            }
        </div>
    }
}

export default Order