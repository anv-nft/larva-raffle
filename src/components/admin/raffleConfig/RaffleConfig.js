import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap';
import styles from "./RaffleConfig.module.scss";
import {POST} from "../../../api/api";
import Pagination from "../../common/Pagination";
import {Link} from "react-router-dom";
import ShippingView from "../../common/ShippingView";

function RaffleConfig(props) {
    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [showPrizeModal, setShowPrizeModal] = useState(false); // 당첨정보 모달
    const [prizeArray, setPrizeArray] = useState([]); // 당첨정보
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const [endRaffleList, setEndRaffleList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    // const offset = (page - 1) * limit;
    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }
    function closePrize() {
        setShowPrizeModal(false);
        setPrizeArray([]);
    }
    const [productTokenId, setProductTokenId] = useState(); //선택 토큰
    const [postUseState, setPostUseState] = useState(false); // 주소 사용 여부
    const [shippingView, setShippingView] = useState(false);
    async function viewAddressFormFadeIn(tokenId, postUse) {
        setPostUseState(postUse);
        setProductTokenId(tokenId);
        setShippingView(true);
    }
    // 래플마감
    async function raffleEnd(round){
        if (window.confirm('정말 마감하시겠습니까?')) {
            try{
                const result = await POST(`/api/v1/raffle/end`,{round},props.adminApiToken);
                if (result.result === 'success') {
                    setAlerts(`${round}회차 래플이 마감되었습니다.`);
                    setShowAlertModal(true);
                } else {
                    throw new Error(result.error);
                }
            } catch (e){
                console.log(e);
                setAlerts(`${round}회차 래플 마감 처리를 실패하였습니다.\n다시 시도해주세요.`);
                setShowAlertModal(true);
            }
        }
    }
    // 래플 취소
    async function raffleCancel(round){
        if (window.confirm('정말 취소하시겠습니까?')) {
            try {
                const result = await POST(`/api/v1/raffle/cancel`, {round}, props.adminApiToken);
                if (result.result === 'success') {
                    setAlerts(`${round}회차 래플이 취소되었습니다.`);
                    setShowAlertModal(true);
                } else {
                    throw new Error(result.error);
                }
            } catch (e) {
                console.log(e);
                setAlerts(`${round}회차 래플 취소처리를 실패하였습니다.\n다시 시도해주세요.`);
                setShowAlertModal(true);
            }
        }
    }
    // 발송완료 처리
    async function raffleItemShippingEnd(round, item){
        if (window.confirm('정말 완료처리하시겠습니까?')) {
            try {
                const tokenId = item.tokenId;
                const result = await POST(`/api/v1/raffle/shipping/end`, {tokenId}, props.adminApiToken);
                if (result.result === 'success') {
                    item.is_complete = 'Y';
                    setAlerts(`${round}회차 ${item.title}이 발송완료 처리되었습니다.`);
                    setShowAlertModal(true);
                }
            } catch (e) {
                console.log(e);
                setAlerts(`${round}회차 [${item.title}] 발송완료 처리를 실패하였습니다.\n다시 시도해주세요.`);
                setShowAlertModal(true);
            }
        }
    }
    // 당첨정보 조회
    async function prizeInfo(round, item){
        try{
            // const tokenId = item.tokenId;
            const result = await POST(`/api/v1/raffle/prize`,{product_idx:item.product_idx},props.adminApiToken);
            if (result.result === 'success') {
                setPrizeArray([result.data.tokenId,result.data.address,result.data.raffleTx,result.data.prizeTx])
                setShowPrizeModal(true);
            }
        } catch (e){
            console.log(e);
            setAlerts(`${round}회차 [${item.title}]\n 당첨 정보를 조회하지 못했습니다.\n다시 시도해주세요.`);
            setShowAlertModal(true);
        }

    }
    useEffect(() => {
        async function getEndRaffleList() {
            await POST(`/api/v1/raffle/getEndRaffleList`,{page,limit},props.adminApiToken).then(async (result) => {
                if (result.result === 'success') {
                    setEndRaffleList(result.data);
                    setLimit(result.limit);
                    setTotal(result.total);
                }
            });
        }
        getEndRaffleList();
    }, [page, props.adminApiToken]);
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
                            <div className={styles.raffle_round}>{props.raffleInfo?.round}회차</div>
                            <br/>
                            {props.raffleInfo?.start_date}
                            ~ {props.raffleInfo?.end_date}
                        </div>
                        <div className={styles.raffle_list_item_box}>
                            <h3>진행상품</h3>
                            {
                                props.raffleList?.map((item, index) => (
                                    <div key={index} className={styles.raffle_list_item}>
                                        <div className={styles.raffle_list_item_left}>
                                            <img src={item.image_url} alt="item img"/>
                                        </div>
                                        <div className={styles.raffle_list_item_right}>
                                            {item.title} : {item.price} <br/>
                                            <span className={styles.raffle_list_item_span}>응모현황 : {item.enter}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.raffle_list_button_box}>
                            <button onClick={()=> raffleEnd(props.raffleInfo?.round)} className={styles.raffle_btn}>래플 마감</button>
                            <button onClick={()=> raffleCancel(props.raffleInfo?.round)} className={styles.disable_btn}>래플 취소</button>
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
                                <div className={styles.raffle_list_item_box2}>
                                    <h3>진행상품</h3>
                                    {
                                        item.item.map((item2, index2) => (
                                            <div key={index2} className={styles.raffle_list_item}>
                                                <div className={styles.raffle_list_item_left}>
                                                    <img src={item2.image_url} alt="item img"/>
                                                </div>
                                                <div className={styles.raffle_list_item_right}>
                                                    {item2.title}<br/>
                                                    <span className={styles.raffle_list_item_span}>응모현황 : {item2.enter}</span>
                                                    <button onClick={ () => prizeInfo(item.round, item2)} className={styles.raffle_list_item_button}>당첨정보</button>
                                                    <button onClick={ () => viewAddressFormFadeIn(item2.tokenId, item2.is_need_address)} className={styles.raffle_list_item_button}>배송신청현황</button>
                                                    {item2.is_complete === 'Y' ? (
                                                        <span className={styles.raffle_list_item_span2}>발송완료</span>
                                                    ):(
                                                        <button onClick={() => raffleItemShippingEnd(item.round, item2)} className={styles.raffle_list_item_button}>발송완료처리</button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <Pagination
                        total={total}
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
            {/*당첨 정보 모달*/}
            <Modal centered show={showPrizeModal}
                   onHide={() => closePrize()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className="alert_msg">응모 토큰ID {prizeArray[0]}</p>
                        <p className="alert_msg">지갑주소 {prizeArray[1]}</p>
                        <p className="alert_msg">응모 트렌젝션: {prizeArray[2]}</p>
                        <p className="alert_msg">당첨 트렌젝션: {prizeArray[4]}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="alert_box">
                    <button variant="" onClick={() => closePrize()} className="close_btn">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            {/*배송정보 확인 모달*/}
            <ShippingView shippingView={shippingView} setShippingView={setShippingView} productTokenId={productTokenId} postUse={postUseState} apiToken={props.adminApiToken} address={props.accounts} setNftTokenId={setProductTokenId}/>
        </>
    )
}

export default RaffleConfig
