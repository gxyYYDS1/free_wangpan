
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract platform{
    //提供存储的地址
    address payable owner_address;

    uint fileId = 10;

    struct File{
        uint id;
        string cid;
        string readme;
        // 下载东西的地址
        address[] downloaders;
        // 上传人的地址
        address uploader;
    }
    File file;

    // 将id映射成文件类，通过ID查找到对应的文件;
    mapping(uint => File) public files;//[{fileId: File Object}]

    // solidity没有返回到前端数据的功能
    // 得到fileID
    event FileIdCreated(uint fileId);
    event FileGetCid(string cid);
    event getIdAndRm(uint fileId,string readme);

    //得到download数组
    event getDownloader_event(address[] downloaders);
    //
    event getFile_event(string cid,address[] downloaders,string readme);


    //使整个contract去接收钱
    receive() external payable{}

    constructor () payable {
        owner_address = payable(msg.sender); //msg.sender 部署智能合约的开发者
    }

    // 上传打钱
    function uploadFile(string memory _fileId,string memory _readme) external payable{
        require(msg.value == 1 ether,"1 ether is required to upload a file");

        fileId += 1;
        file.id = fileId;
        file.cid =  _fileId;
        file.readme = _readme;
        file.uploader = msg.sender; //msg.sender 现在是上传人的address;

        owner_address.transfer(1 ether);

        files[fileId] = file;

        emit getIdAndRm(fileId,_readme);

    }
    // 下载打钱
    function downloadFile(uint _file_id) external payable{
        require(msg.value == 1 ether,"1 ether is required to upload a file");
        // 上传人分红
        payable (files[_file_id].uploader).transfer(0.8 ether);
        // 向存储方分红
        owner_address.transfer(0.2 ether);

        // 将下载人的地址存储到文件类离得downloader里
        files[_file_id].downloaders.push(msg.sender);

        //触发 getCid方法 之后 前端监听这个数据 去得到Cid
        emit FileGetCid(files[_file_id].cid);

    }
    // 向智能合约打钱
    function uploaderWithdraw(uint _amount, uint _file_id) public {
        require(msg.sender == files[_file_id].uploader,"you are not the owner of the file");
        payable(msg.sender).transfer(_amount);
    }
    //取钱
    function ownerWithdraw(uint _amount) public {
        require(payable(msg.sender) == owner_address);
        owner_address.transfer(_amount);
    }

    function getFileId()  external{
        emit FileIdCreated(fileId);
    }

    function getFile(uint _fileId)  external {

        emit getFile_event(files[_fileId].cid,files[_fileId].downloaders,files[_fileId].readme);

    }
}
