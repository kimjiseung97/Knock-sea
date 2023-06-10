package com.knocksea.see.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = {"inquiryId"})
@Builder
@Table(name = "inquiry")
@Entity
public class Inquiry {

    @Id
    @Column(name = "inquiry_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inquiryId;

    @Column(name = "inquiry_details", nullable = false)
    private String inquiryDetails;

    @Column(name = "inquiry_date_time", nullable = false)
    @CreationTimestamp
    private LocalDateTime inquiryDateTime;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;

//    @OneToOne(mappedBy = "inquiry", orphanRemoval = true) // 필드명
//    private Answer answer;

    @Column(name = "user_id", nullable = false)
    private int userId;


}
