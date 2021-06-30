import ReactPlaceholder from "react-placeholder";
import { RectShape } from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";
import styles from "../../styles/Video.module.css";

const customPlaceholder = (
  <div className={`lg:grid grid-cols-1 lg:grid-cols-3 gap-10`}>
    {/* Video Section */}
    <div className={`w-full flex flex-col ${styles.videoSection}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RectShape
          key={index}
          color="#E0E0E0"
          className="shadow-sm w-full h-32 mt-5 items-center rounded-md"
          style={{
            height: "150px",
          }}
        />
      ))}
    </div>

    {/* Subs Section */}
    <RectShape
      color="#E0E0E0"
      className="shadow-sm w-full mt-5 rounded-md"
      style={{
        maxHeight: "42rem",
      }}
    />
  </div>
);

type CategorySkeltetonProps = {
  children: React.ReactNode;
  ready: boolean;
};

const CategorySkelteton: React.FC<CategorySkeltetonProps> = ({
  children,
  ready,
}) => (
  <ReactPlaceholder
    customPlaceholder={customPlaceholder}
    showLoadingAnimation={true}
    ready={ready}
  >
    {children}
  </ReactPlaceholder>
);

export default CategorySkelteton;
