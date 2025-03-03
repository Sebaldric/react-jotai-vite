# ノートアプリ

## URL

https://react-jotai-vite-8tfahaz4q-sebaldric-beachovins-projects.vercel.app

## 機能概要

convex + jotai + react + vite

### 1. ノート管理システム

#### 主要機能

1. **ノートの作成**

   - 「+」ボタンで新規ノートを作成
   - デフォルトタイトル: "Untitled"
   - 作成時に空の内容で初期化

2. **ノートの編集**

   - タイトルのインライン編集
   - 内容の編集（エディター機能）
   - 自動保存機能（500msのデバウンス処理）

3. **ノートの削除**

   - 各ノートの「-」ボタンで削除
   - 削除の即時反映

4. **ノートの一覧表示**
   - サイドメニューでの一覧表示
   - 最終編集時間の表示
   - タイトルと更新日時の表示

### 2. 技術実装の詳細

#### 状態管理

- **Jotai**を使用した状態管理
  ```typescript
  const [notes, setNotes] = useAtom(notesAtom);
  const setSelectedNoteId = useSetAtom(selectedNoteIdAtom);
  ```

#### データ永続化

- **Convex**を使用したバックエンド連携
  ```typescript
  const createNote = useMutation(api.notes.create);
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNote = useMutation(api.notes.updateNote);
  ```

#### UI/UX機能

1. **デバウンス処理**

   ```typescript
   const debounceTitle = useDebounce(editingNote?.title, 500);
   ```

   - タイトル編集時の自動保存
   - サーバーへの過剰なリクエスト防止

### 3. コンポーネント構造

#### SideMenu

- ノート一覧の表示と管理
- 新規ノート作成機能
- ノート削除機能
- タイトル編集機能

#### Editor

- ノート内容の編集機能
- リアルタイム保存
- マークダウンプレビュー（実装予定）

### 4. データモデル

#### Note型

```typescript
class Note {
  constructor(
    public id: Id<"notes">,
    public title: string,
    public content: string,
    public lastEditTime: number
  ) {}
}
```

### 5. 今後の拡張予定機能

1. マークダウンサポート
2. タグ付け機能
3. ノート検索機能
4. ノートの共有機能
5. バージョン履歴管理

### 6. パフォーマンス最適化

1. デバウンス処理による更新の最適化
2. メモ化によるレンダリング最適化
3. 仮想スクロールの実装（大量のノート対応）
