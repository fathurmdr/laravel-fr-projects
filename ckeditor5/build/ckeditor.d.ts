/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Bold, Code, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { FontBackgroundColor, FontColor, FontSize } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { AutoImage, Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload } from "@ckeditor/ckeditor5-image";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { SimpleUploadAdapter } from "@ckeditor/ckeditor5-upload";
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof Alignment | typeof Autoformat | typeof AutoImage | typeof BlockQuote | typeof Bold | typeof Code | typeof CodeBlock | typeof Essentials | typeof FindAndReplace | typeof FontBackgroundColor | typeof FontColor | typeof FontSize | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof Italic | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof PasteFromOffice | typeof Table | typeof TableToolbar | typeof TextTransformation | typeof SimpleUploadAdapter)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
            shouldNotGroupWhenFull: boolean;
        };
        language: string;
        image: {
            toolbar: string[];
        };
        table: {
            contentToolbar: string[];
        };
    };
}
export default Editor;
