import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap';
import {POST} from "../../../api/api";
import styles from "./SelectNftBoxModal.module.scss"
import iconX from "../../../assets/images/icon/icon_x_s.png";
// import Caver from "caver-js";
// import {contracts} from "../../../utils/web3/contracts";
// import {PAUSABLE_NFT} from "../../../utils/abi/PAUSABLE_NFT";

function SelectNftBoxModal(props) {
    // const provider = window['klaytn'];
    // const caver = new Caver(provider);
    // const PFP_3D_NFT_CONTRACT_ADDRESS = contracts['pfp_3d_nft_contract'][props.networkId];
    // const nftContract = new caver.klay.Contract(PAUSABLE_NFT, PFP_3D_NFT_CONTRACT_ADDRESS);
    const [selectModal, setSelectModal] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [selectedNft, setSelectedNft] = useState("");

    function selectNft(e) {
        const box = e.currentTarget;
        if (selectedNft !== "") {
            selectedNft.classList.remove(styles.active);
        }
        setSelectedNft(box);
        box.classList.add(styles.active);
    }

    function selectComplete() {
        // if (props.selectSequence === 1) {
        //     props.setFirstToken({
        //         id: selectedNft.childNodes[1].childNodes[1].innerText,
        //         img: selectedNft.childNodes[0].src,
        //         character: selectedNft.childNodes[2].innerText,
        //     });
        // } else {
        //     props.setSecondToken({
        //         id: selectedNft.childNodes[1].childNodes[1].innerText,
        //         img: selectedNft.childNodes[0].src,
        //         character: selectedNft.childNodes[2].innerText,
        //     });
        //
        // }
        // props.setSelectBox(false);
    }

    function reffle(idx) {
        console.log(idx);
    }

    useEffect(() => {
        async function getNft() {
            props.setShowLoading(true);
            const token = props.apiToken;
            const address = props.userAddress;
            await POST(`/api/v1/raffle/getNftList`, {
                address,
            }, token).then(async (result) => {
                let nftList = result.data;
                if (result.result === 'success') {
                    for (let index = 0; index < nftList.length; index++) {
                        // todo : contract 호출 사용 하였는지 안했는지
                        if ('0x' + parseInt('3537').toString(16) === nftList[index].tokenId) {
                            nftList[index].status = 'Used';
                        }
                    }
                    setListItem(nftList);
                    setSelectModal(true);
                }
            });
            props.setShowLoading(false);
        }

        getNft();
    }, [props.selectBox]);
    return (
        <Modal id={styles.myNftBox} centered size="xs" show={selectModal}
               onHide={() => props.setSelectBox(false)}>
            <Modal.Body>
                <div className={styles.select_nft_title}>
                    <h3>
                        My NFT Collection book
                        <div>
                            {(selectedNft) ? (
                                <div className={styles.on_status} onClick={() => selectComplete()}>
                                    Raffle
                                </div>
                            ) : (
                                <div className={styles.off_status}>
                                    0 / 1
                                </div>
                            )}
                            <img onClick={() => props.setSelectBox(false)} src={iconX} alt="close icon"/>
                        </div>

                    </h3>

                </div>
                <div className={styles.select_nft_box}>
                    {
                        listItem.map((nft) => (
                            (nft.status) ? (
                                <div key={nft.tokenId} className={`${styles.nft_box} ${styles.selected_box}`}>
                                    <img className={styles.nft_img} src={nft.image} alt={nft.tokenId}/>
                                    <span>#<span>{parseInt(nft.tokenId, 16)}</span> Larva</span>
                                    <span className={styles.hide}>{nft.character}</span>
                                    <div className={styles.selected_dim}>{nft.status}</div>
                                </div>
                            ) : (
                                <div key={nft.tokenId} className={styles.nft_box} onClick={(event) => {
                                    selectNft(event)
                                }}>
                                    <img className={styles.nft_img} src={nft.image} alt={nft.tokenId}/>
                                    <span>#<span>{parseInt(nft.tokenId, 16)}</span> Larva</span>
                                </div>
                            )
                        ))
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SelectNftBoxModal
