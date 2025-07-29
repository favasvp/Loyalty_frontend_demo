import React, { useEffect, useState } from "react";
import sdkApi from "../../../utils/sdkApi";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const Offers = () => {
  const { id: customerID } = useParams();
  const apiKey = import.meta.env.VITE_CLIENT_API_KEY;
  const rows = 10;

  const [offerData, setOfferData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchOfferData = async () => {
    try {
      const offers = await sdkApi.getMerchantOffers(customerID, apiKey, {
        categoryId: activeCategory,
        page,
        limit: rows,
      });

      const newOffers = offers.data || [];

      setOfferData((prevData) => [...prevData, ...newOffers]);

      if (newOffers.length < rows) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Reset and fetch new offers on category change
  useEffect(() => {
    if (customerID && apiKey) {
      const resetAndFetch = async () => {
        setOfferData([]);
        setPage(1);
        setHasMore(true);
        setLoading(true);

        try {
          const offers = await sdkApi.getMerchantOffers(customerID, apiKey, {
            categoryId: activeCategory,
            page: 1,
            limit: rows,
          });

          const newOffers = offers.data || [];

          setOfferData(newOffers);
          if (newOffers.length < rows) {
            setHasMore(false);
          } else {
            setPage(2); // next page for infinite scroll
          }
        } catch (error) {
          console.error("Initial fetch failed:", error);
          setHasMore(false);
        } finally {
          setLoading(false);
        }
      };

      resetAndFetch();
    }
  }, [activeCategory, customerID, apiKey]);

  return (
    <div className="px-4">
      {loading && offerData.length === 0 ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={100}
          animation="wave"
        />
      ) : (
        <InfiniteScroll
          dataLength={offerData.length}
          next={fetchOfferData}
          hasMore={hasMore}
          loader={<Skeleton width="100%" height={80} />}
        >
          {offerData.map((item, index) => (
            <div key={index} className="py-2">
              <div className="text-lg font-semibold">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>

              {index !== offerData.length - 1 && (
                <div className="border-b border-[rgba(0,0,0,0.15)] my-2" style={{ borderBottomWidth: "0.6px" }} />
              )}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Offers;
