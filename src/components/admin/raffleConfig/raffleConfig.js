import React, {useEffect, useRef, useState} from 'react'
import {Modal, Button} from 'react-bootstrap';
import styles from "./raffleConfig.module.scss";
import ReffleItem01 from "../../../assets/images/home/reffle_item_01.png";
import {POST} from "../../../api/api";
import Pagination from "../../pagination";
import {Link} from "react-router-dom";

function RaffleConfig(props) {
    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const [currentRaffleList, setCurrentRaffleList] = useState([]);
    const [currentRaffleInfo, setCurrentRaffleInfo] = useState([]);
    const [endRaffleList, setEndRaffleList] = useState([]);
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }

    useEffect(() => {
        async function getCurrentRaffleList() {
            const address = props.accounts;
            await POST(`/api/v1/raffle/getCurrentRaffleList`).then(async (result) => {
                if (result.result === 'success') {
                    setCurrentRaffleList(result.data);
                    setCurrentRaffleInfo(result.info);
                }
            });
        }

        getCurrentRaffleList();
        setEndRaffleList([{
            round: 1,
            start_date: '22.01.13 AM 00:00',
            end_date: '22.01.15 AM 00:00',
            item: [{
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x1',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x2',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x3',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x4',
            }]
        }, {
            round: 1,
            start_date: '22.01.13 AM 00:00',
            end_date: '22.01.15 AM 00:00',
            item: [{
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x1',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x2',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x3',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x4',
            }]
        }, {
            round: 1,
            start_date: '22.01.13 AM 00:00',
            end_date: '22.01.15 AM 00:00',
            item: [{
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x1',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x2',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x3',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x4',
            }]
        }, {
            round: 1,
            start_date: '22.01.13 AM 00:00',
            end_date: '22.01.15 AM 00:00',
            item: [{
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x1',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x2',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x3',
            }, {
                title: '에어팟 프로 (2세대)',
                image_url: '/assets/images/home/reffle_item_01.png',
                tokenId: '0x4',
            }]
        },]);
    }, []);
    return (
        <>
            <div className={styles.raffle_config}>
                <h2 className={styles.raffle_config_title}>
                    래플 관리
                </h2>
                <Link to="/admin/raffle_add" className={styles.add_btn}>신규등록</Link>
                {/*진행중*/}
                <div className={styles.active_raflle_box}>
                    <div className={styles.content_title}>
                        <span>진행중</span>
                    </div>
                    <div className={styles.raffle_list}>
                        <div className={styles.raffle_list_info}>
                            <div className={styles.raffle_round}>{currentRaffleInfo.round}회차</div>
                            <br/>
                            {currentRaffleInfo.start_date}
                            ~ {currentRaffleInfo.end_date}
                        </div>
                        <div className={styles.raffle_list_item_box}>
                            <h3>진행상품</h3>
                            {
                                currentRaffleList.map((item, index) => (
                                    <div key={index} className={styles.raffle_list_item}>
                                        <div className={styles.raffle_list_item_left}>
                                            <img src={item.image_url} alt="item img"/>
                                        </div>
                                        <div className={styles.raffle_list_item_right}>
                                            {item.title} : {item.price} <br/>
                                            <button className={styles.raffle_list_item_button}>응모현황</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.raffle_list_button_box}>
                            <button className={styles.raffle_btn}>래플 마감</button>
                            <button className={styles.disable_btn}>래플 취소</button>
                        </div>
                    </div>
                </div>
                {/*종료*/}
                <div className={styles.active_raflle_box}>
                    <div className={styles.content_title}>
                        <span>종료</span>
                    </div>
                    {
                        endRaffleList.map((item, index) => (
                            <div key={index} className={styles.raffle_list}>
                                <div className={styles.raffle_list_info}>
                                    <div className={`${styles.raffle_round} ${styles.disable}`}>{item.round}회차</div>
                                    <br/>
                                    {item.start_date}
                                    ~ {item.end_date}
                                </div>
                                <div className={styles.raffle_list_item_box}>
                                    <h3>진행상품</h3>
                                    {
                                        item.item.map((item2, index2) => (
                                            <div key={index2} className={styles.raffle_list_item}>
                                                <div className={styles.raffle_list_item_left}>
                                                    <img src={item2.image_url} alt="item img"/>
                                                </div>
                                                <div className={styles.raffle_list_item_right}>
                                                    {item2.title}<br/>
                                                    <button className={styles.raffle_list_item_button}>응모현황</button>
                                                    <button className={styles.raffle_list_item_button}>배송신청현황</button>
                                                    <button className={styles.raffle_list_item_button}>발송완료처리</button>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                <div className={styles.raffle_list_button_box}>
                                    <button className={styles.raffle_btn}>구매 체결 트랜잭션</button>
                                    <button className={styles.disable_btn}>환불 트랜잭션</button>
                                </div>
                            </div>
                        ))
                    }
                    <Pagination
                        total={posts.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </div>
            {/*알림창 모달*/}
            <Modal centered show={showAlertModal}
                   onHide={() => closeAlert()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className="alert_msg"> {alerts}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="alert_box">
                    <button variant="" onClick={() => closeAlert()} className="close_btn">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RaffleConfig
