import React, { Component } from 'react';
import { Icon, message } from 'antd';
import '../scss/mine.scss';
// import { withStorage } from '../utils/hoc';

class Mine extends Component {
    state = {
        account: ''
    }
    toAccount = () => {
        this.props.history.push('/account');
    }
    toOrder = () => {
        this.props.history.push('/order');
    }
    logout = () => {
        localStorage.removeItem("TOKEN");
        message.info("已退出登录，自动返回首页");
        this.props.history.push('/discover');
    }
    componentDidMount() {
        if (localStorage.getItem("TOKEN"))
            this.setState({ account: JSON.parse(localStorage.getItem("TOKEN")).account })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => { return; }
    }
    render() {
        let { account } = this.state;
        return <div className="mine">

            <header className="mine-header">
                <section className="mine-user">
                    <h1 className="user-title">个人中心</h1>
                    <h3 className="user-name">{account}</h3>
                    <section className="user-avatar" ></section>
                </section>
                <section className="mine-fund">
                    <section className="fund-cart">
                        <div className="fund-logo">
                            <span className="logo"><img src="/img/fund-logo.png" alt="logo" /></span>
                            <span>玩途旅行基金</span>
                        </div>
                        <div className="fund-con">
                            <div className="fund-left">
                                <img src="/img/fund-left.png" alt="" />
                                <div>
                                    <p className="p1">基金金额</p>
                                    <small>1基金可无门槛抵扣1元机票消费</small>
                                </div>
                            </div>
                            <div className="fund-right">
                                <span className="money">0</span>
                                <Icon type="right" />
                            </div>
                        </div>
                    </section>
                    <section className="invite-friend">
                        <img src="/img/friend.png" alt="friend" />
                        <div>
                            <p>邀请好友，赚基金</p>
                            <small>已过期，需要购买机票获得权限</small>
                        </div>
                        <Icon type="right" style={{ color: '#999' }} />
                    </section>
                </section>
            </header>

            <main className="mine-main">
                <h2 className="h2">我的</h2>
                <section className="mine-list">
                    <section className="list-row" onClick={this.toOrder}>
                        <span className="icon iconfont">&#xe6bd;</span>
                        <p className="row-con">我的订单</p>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="list-row">
                        <span className="icon iconfont">&#xe660;</span>
                        <p className="row-con">优惠券</p>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="list-row" onClick={this.toAccount}>
                        <span className="icon iconfont">&#xe80a;</span>
                        <p className="row-con">账号</p>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="list-row">
                        <span className="icon iconfont">&#xe897;</span>
                        <p className="row-con">常用出行人及地址</p>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="list-row">
                        <span className="icon iconfont">&#xe677;</span>
                        <p className="row-con"> 旅行+ 会员计划</p>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="new-user-entry"></section>
                </section>
                <h2 className="h2">联系玩途</h2>
                <section className="mine-contact">
                    <section className="list-row">
                        <span className="icon iconfont">&#xe6c2;</span>
                        <div className="row-con">
                            <p>玩途服务热线「海外」</p>
                            <p className="p2">语言: 中文 | 服务时间: 24小时</p>
                        </div>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                    <section className="list-row">
                        <span className="icon iconfont">&#xe6c2;</span>
                        <div className="row-con">
                            <p>玩途服务热线「国内」</p>
                            <p className="p2">语言: 中文 | 服务时间: 24小时</p>
                        </div>
                        <Icon type="right" style={{ paddingLeft: 8, color: '#ccc' }} />
                    </section>
                </section>
                <section className="logout" onClick={this.logout}>退出登录</section>
            </main>
        </div>
    }
}

export default Mine;