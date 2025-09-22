import { Folder } from "@/lib/api/foldersService";
import cn from "classnames";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, FreeMode, Navigation } from 'swiper/modules';
import { useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import styles from "./FolderTabs.module.scss";
import ArrowIcon from '/public/svg/arrow.svg'
type Props = {
  folders: Folder[];
  selectedFolderId: string | null | undefined;
  onSelectFolder: (folderId: string | null) => void;
};

export default function FolderTabs({ folders, selectedFolderId, onSelectFolder }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const allFolder = folders?.find(f => f.isSystem);
  const regularFolders = folders?.filter(f => !f.isSystem) || [];

  const allTabs = [{ id: null, name: 'Все', isSystem: true }, ...regularFolders];

  const getActiveTabIndex = () => {
    return allTabs.findIndex(tab =>
      selectedFolderId === null ? tab.id === null : tab.id === selectedFolderId
    );
  };

  useEffect(() => {
    if (swiperRef.current) {
      const activeIndex = getActiveTabIndex();
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300);
      }
    }
  }, [selectedFolderId]);

  const handleAllFolderClick = () => {
    onSelectFolder(null);
  };

  const handleFolderClick = (folder: Folder) => {
    onSelectFolder(folder.id);

  };

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <div className={styles.container}>
      <Swiper
        className={styles.swiper}
        modules={[Mousewheel, Keyboard, FreeMode, Navigation]}
        slidesPerView="auto"
        spaceBetween={8}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        freeMode={{
          enabled: true,
          sticky: false,
        }}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
        }}
        keyboard={{
          enabled: true,
        }}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >

        {allTabs.map((tab) => (
          <SwiperSlide key={tab.id || 'all'} className={styles.slide}>
            <button
              className={cn(styles.tab, (selectedFolderId === null ? tab.id === null : tab.id === selectedFolderId) && styles.active)}
              onClick={() => {
                if (tab.id === null) {
                  handleAllFolderClick();
                } else {
                  handleFolderClick(tab as Folder);
                }
              }}
            >
              {tab.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.arrows}>

        <button className={cn(styles.nextButton, styles.prev, 'prev')} ref={navigationPrevRef}>
          <ArrowIcon/>
        </button>
        <button className={cn(styles.nextButton, styles.next, 'next')} ref={navigationNextRef}>
          <ArrowIcon/>
        </button>
      </div>

    </div>
  );
}