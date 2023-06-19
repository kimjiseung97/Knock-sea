package com.knocksea.see.user.api;


import com.knocksea.see.auth.TokenProvider;
import com.knocksea.see.auth.TokenUserInfo;
import com.knocksea.see.exception.DuplicatedEmailException;
import com.knocksea.see.exception.NoRegisteredArgumentsException;
import com.knocksea.see.user.dto.request.FishingModifyRequestDTO;
import com.knocksea.see.user.dto.request.FishingSpotRegisterRequestDTO;
import com.knocksea.see.user.dto.request.ShipModifyRequestDTO;
import com.knocksea.see.user.dto.request.ShipRegisterRequestDTO;
import com.knocksea.see.user.dto.response.FishingSpotRegisterResponseDto;
import com.knocksea.see.user.dto.response.ShipModifyResponseDTO;
import com.knocksea.see.user.dto.response.ShipRegisterResponseDTO;
import com.knocksea.see.user.entity.FishingSpot;
import com.knocksea.see.user.service.FishingSpotService;
import com.knocksea.see.user.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/fishing")
public class FishingSpotApiController {

    private final FishingSpotService fishingSpotService;


    private final ImageService imageService;

    //낚시터 등록 요청
    //post : /api/v1/fishing/register
    @PostMapping("/register")
    public ResponseEntity<?> registerShip(@Validated @RequestPart("spot") FishingSpotRegisterRequestDTO dto,
                                          @RequestPart(value = "spotImage", required = false) List<MultipartFile> spotImages,
                                          @AuthenticationPrincipal TokenUserInfo userInfo
            , BindingResult result) {
        //값 들어오는지 확인
        log.info("/fishing/register POST! --{}", dto);


//        String savePath = null;
//        if (!profileImage.isEmpty()) {
//            savePath = FileUtil.uploadFile(dto.getProfileImage(), rootPath);
//        }

        if (result.hasErrors()) {
            log.warn("DTO 검증 에러 발생 : {}", result.getFieldError());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }
        try {
            FishingSpotRegisterResponseDto fishingSpotRegisterResponseDto = fishingSpotService.save(dto, userInfo.getUserId());

            if(spotImages!=null) {
                //이미지 파일들이 잘 들어왔다면 원본이름 출력시키기
                for (MultipartFile shipImage : spotImages) {
                    log.info(shipImage.getOriginalFilename());
                }
                //이미지 저장시키기
                imageService.saveSpotImages(spotImages, userInfo);
            }

            return ResponseEntity.ok().body(fishingSpotRegisterResponseDto);
        } catch (NoRegisteredArgumentsException e) {
            log.warn("필수 등록 정보를 받지 못했습니다.");
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DuplicatedEmailException e) {
            log.warn("이메일이 중복되었습니다");
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    //낚시터 정보 수정 요청
    //post : /api/v1/fishing/modify
    @RequestMapping(value = "/modify", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<?> modifyUser(@Validated @RequestBody FishingModifyRequestDTO dto
            ,@AuthenticationPrincipal TokenUserInfo userInfo, BindingResult result){

        //값 들어오는지 확인
        log.info("/user/register PUT! --{}", dto);

        if (result.hasErrors()) {
            log.warn("DTO 검증 에러 발생 : {}", result.getFieldError());
            return ResponseEntity
                    .badRequest()
                    .body(result.getFieldError());
        }

        try{
//            ShipModifyResponseDTO modify = fishingSpotService.modify(dto, userInfo);
//            return ResponseEntity.ok().body(modify);
            return null;
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
