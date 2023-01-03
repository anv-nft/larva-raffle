import React, {useState, useEffect,useRef} from 'react';
import { ScrollParallax } from "react-just-parallax";
import "swiper/swiper.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import VisualBackground from "../../assets/images/home/back.png";
import VisualCard01 from "../../assets/images/home/card_01.png";
import VisualCard02 from "../../assets/images/home/card_02.png";
import VisualCard03 from "../../assets/images/home/card_03.png";
import VisualTitleBadge from "../../assets/images/home/title_badge.png";
// import VisualCharacter from "../../assets/images/home/home_visual_character.png";
import ContentBackground from "../../assets/images/home/back_mid_01.png";
import ReffleItem01 from "../../assets/images/home/reffle_item_01.png";
import styles from "./Home.module.scss";
import {Modal} from "react-bootstrap";

export default function Home(props) {

    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const raffleList = [{
        'idx': 1,
        'title':'에어팟 프로 (2세대)',
        'price':1553,
        'status':52,
        'image_url': '/assets/images/home/reffle_item_01.png'
    },{
        'idx': 2,
        'title':'라바쿠션',
        'price':102,
        'status':2,
        'image_url': '/assets/images/home/reffle_item_02.png'
    },{
        'idx': 3,
        'title':'BHC 맛초킹 콤보 + 콜라 1.25L',
        'price':89,
        'status':1655,
        'image_url': '/assets/images/home/reffle_item_03.png'
    },{
        'idx': 4,
        'title':'스타벅스 부드러운 디저트',
        'price':48,
        'status':552,
        'image_url': '/assets/images/home/reffle_item_04.png'
    }];
    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }

    // 브리딩 시간안내
    function breedingAlert() {
        setAlerts(`${props.t("breeding_date")} \n2022/11/8 20:00 ~ 2022/11/9 20:00`);
        setShowAlertModal(true);
        return false;
    }
    function reffle (idx) {
        console.log(idx);
    }

    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    });
    return (
        <div className={styles.home}>
            <section className={styles.visual_section}>
                <img className={styles.background_img} src={VisualBackground} alt="Visual Background"/>
                <ScrollParallax strength={0.2} lerpEase={0.06} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img className={`${styles.visual_card} ${styles.card_01}`} src={VisualCard01} alt="Visual Background"/>
                </ScrollParallax>

                <ScrollParallax strength={0.15} lerpEase={0.12} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img className={`${styles.visual_card} ${styles.card_02}`} src={VisualCard02} alt="Visual Background"/>
                </ScrollParallax>
                <ScrollParallax strength={0.07} lerpEase={0.08} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img className={`${styles.visual_card} ${styles.card_03}`} src={VisualCard03} alt="Visual Background"/>
                </ScrollParallax>
                <div className={styles.visual_box}>
                    <h1 className={styles.visual_box_title}>
                       LARVA NFT<br/>
                       <span>RAFFLE EVENT</span>
                        <div className={styles.visual_box_title_img}>
                            <img src={VisualTitleBadge}/>
                            <span>1회차</span>
                        </div>
                    </h1>
                    <p className={styles.visual_box_text}>
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                    </p>
                    <div className={styles.visual_box_date}>
                        <div>
                            <div>기간</div>
                            <div>22.10.01 AM 00:00<br/>~ 22.12.16 PM 00:00</div>
                        </div>
                        <div>
                            <div>발표</div>
                            <div>22.12.16 AM 00:00</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.content_section}>
                <h2 className={styles.content_title}>LARVA NFT RAFFLE</h2>
                <div className={styles.content_background}>
                    <img src={ContentBackground} />
                    <div className={styles.content_box}>
                        {
                            raffleList.map((item, index) => (
                                <div key={index} className={styles.raffle_item}>
                                    <div className={styles.raffle_item_info}>
                                        <img src={ReffleItem01} />
                                        <h6>{item.title}</h6>
                                        <div>
                                            <label>가격</label>
                                            <p>{item.price.toLocaleString('ko-KR')}<span>KANV</span></p>
                                        </div>
                                        <div>
                                            <label>응모현황</label>
                                            <p>{item.status.toLocaleString('ko-KR')}<span>개</span></p>
                                        </div>
                                    </div>
                                    <button onClick={() => reffle(item.idx)} className={styles.raffle_btn}>응모하기</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/*알림창 모달*/}
            <Modal centered show={showAlertModal}
                   onHide={() => closeAlert()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className={styles.alert_msg}> {alerts}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className={styles.alert_box}>
                    <button variant="" onClick={() => closeAlert()} className={styles.alert_btn}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
