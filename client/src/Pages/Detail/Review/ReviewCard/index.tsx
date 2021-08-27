import styled, { css } from "styled-components";
import { ReviewType } from "@/shared/type";
import Rating from "@/Components/Rating";
import { gap, media } from "@/styles/theme";
import { YYYY_M_D_H_m } from "@/utils/util";
import properties from "@/config/properties";
import { Link } from "@/Router";
import ImageHoverWrapper from "@/Components/ImageHoverWrapper";

const ReviewCard = ({ review }: { review: ReviewType }) => {
  return (
    <Wrapper>
      <div className="rating">
        <Rating value={review.rate} readOnly color="#fff" />
      </div>
      <div className="image-box">
        <Link to={`/detail/${review.product.id}`}>
          <div className="image">
            <ImageHoverWrapper
              src={properties.imgURL + review.image}
              alt="review_img"
            />
          </div>
        </Link>
      </div>
      <div className="info">
        <Link to={`/detail/${review.product.id}`}>
          <Header>
            {review.product.name} / {review.authorName}
          </Header>
        </Link>
        <div className="content">{review.content}</div>
        <div className="date">{YYYY_M_D_H_m(review.date)}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.font.small}
  ${({ theme }) => theme.shadow}
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  padding-top: 3rem;
  box-sizing: border-box;
  position: relative;

  .rating {
    background: ${({ theme }) => theme.color.primary3};
    color: #fff;
    padding: 0.4rem 0.7rem 0.1rem 0.7rem;
    border-radius: 2rem;
    position: absolute;
    top: -1rem;
    left: 1rem;
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      ${({ theme }) => theme.font.medium};
      font-weight: 400;
      line-height: 3.5rem;
      white-space: pre-line;
      padding: 2rem 0;
      box-sizing: border-box;
    }
  }

  .image-box {
    max-width: 30rem;
    align-self: center;
    .image {
      height: 24rem;
    }
  }
  .date {
    text-align: right;
    ${({ theme }) => theme.font.small};
  }

  ${media.tablet} {
    justify-content: flex-start;
  }

  ${media.mobile} {
    flex-direction: row;

    .image-box {
      max-width: 15rem;
      margin-right: 2rem;
      .image {
        height: 15rem;
      }
    }
  }
`;

const Header = styled.div`
  padding: 2rem 0;
  border-bottom: 0.1rem solid ${({ theme }) => theme.color.light_grey1};
  ${({ theme }) => theme.font.medium};
  &:hover {
    color: ${({ theme }) => theme.color.body};
  }
`;

export default ReviewCard;
