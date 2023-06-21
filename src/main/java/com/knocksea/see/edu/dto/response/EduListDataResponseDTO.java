package com.knocksea.see.edu.dto.response;

import com.knocksea.see.edu.entity.Edu;
import com.knocksea.see.inquiry.dto.page.PageResponseDTO;
import lombok.*;

@Setter
@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EduListDataResponseDTO {

    private String eduTitle;
    private double reviewAverage;
    private String userName;
    private String eduLocation;
    private int eduPrice;

    private int count; //총게시물 수
    private PageResponseDTO pageInfo; //페이지 렌더링 정보

    public EduListDataResponseDTO(Edu edu) {
        this.eduTitle = edu.getEduTitle();
        this.eduLocation = edu.getEduLocationInfo();
        this.eduPrice = edu.getEduPrice();
    }
}
